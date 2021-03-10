import {followApi, usersApi} from "../API/Api";
import {reset} from "redux-form";
import {setIsFollowed} from "./profileReducer";

//константы action-ов.
const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const SET_USERS = 'users/SET-USERS';
const SET_CURRENT_PAGE = 'users/SET-CURRENT-PAGE';
const SET_USERS_TOTAL = 'users/SET-USERS-TOTAL';
const LOADING_IN_PROGRESS = 'users/LOADING-IN-PROGRESS';
const FOLLOWING_IN_PROGRESS = 'users/FOLLOWING-IN-PROGRESS';
const SET_SEARCHING_USER_NAME = 'users/SET-SEARCHING-USER-NAME';

//изначальные значения части state
let initialState = {
    //массив всех юзеров, приходящих от серврера
    users: [],
    //общее число выданных юзеров
    totalUsers: 0,
    //текущая страница показываемых юзеров
    currentPage: 1,
    //хардкод количетсва юзеров на одной страницы
    usersOnPage: 5,
    //тригер загрузки
    isLoading: false,
    //массив, куда временно добавляются id пользователей, с которыми проводим операцию follow/unfillow
    goingToFollow: [],
    //сюда записывается поисковый запрос
    searchingUserName: null
}
//поскольку reducer реализует концепцию чистых функций, то он внутри себя ничего не менят, а создает копию всего state
//и отдельных переменных, массивов, объектов и прочего через spread-оператор [...]
const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW: {
            return (
                {
                    ...state,
                    users: state.users.map((u) => {
                        if (u.id === action.id) {
                            return {...u, followed: true}
                        }
                        return u;
                    })
                }
            )
        }
        case UNFOLLOW: {
            return (
                {
                    ...state,
                    users: state.users.map((u) => {
                        if (u.id === action.id) {
                            return {...u, followed: false}
                        }
                        return u;
                    })
                }
            )
        }
        case SET_USERS: {
            return {...state, users: action.users}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_USERS_TOTAL: {
            return {...state, totalUsers: action.totalUsers}
        }
        case LOADING_IN_PROGRESS: {
            return {...state, isLoading: action.isLoading}
        }
        case FOLLOWING_IN_PROGRESS: {
            return {
                ...state,
                goingToFollow: action.isLoading
                    ? [...state.goingToFollow, action.id]
                    : [state.goingToFollow.filter(id => id !== action.id)]
            }
        }
        case SET_SEARCHING_USER_NAME: {
            return {...state, searchingUserName: action.searchingUserName}
        }
        default:
            return state;
    }
}
//Action creators
export const follow = (id) => ({type: FOLLOW, id});
export const unfollow = (id) => ({type: UNFOLLOW, id});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setUsersTotal = (totalUsers) => ({type: SET_USERS_TOTAL, totalUsers});
export const loadingInProgress = (isLoading) => ({type: LOADING_IN_PROGRESS, isLoading});
export const followingInProgress = (isLoading, id) => ({type: FOLLOWING_IN_PROGRESS, isLoading, id});
export const setSearchingUserName = (searchingUserName) => ({type: SET_SEARCHING_USER_NAME, searchingUserName});
export default usersReducer;

//thunk creators.Через колбэк принимают доп. данные и диспатч

export const requestUsers = (currentPage = 1, usersOnPage = 5, lookingForAFriends = false, searchingName = null) => async (dispatch) => {
    dispatch(loadingInProgress(true));

    let response
    if (searchingName === null) {
        lookingForAFriends
            ? response = await usersApi.getListOfFollowingUsers(currentPage, usersOnPage)
            : response = await usersApi.getUsers(currentPage, usersOnPage)
    } else {
        dispatch(setSearchingUserName(searchingName))
        response = await usersApi.findUserByName(currentPage, usersOnPage, searchingName)
    }
    dispatch(loadingInProgress(false));
    dispatch(setUsers(response.items));
    dispatch(setUsersTotal(response.totalCount));
}
export const followUser = (id) => async (dispatch) => {
    dispatch(followingInProgress(true, id))
    let response = await followApi.followUser(id)
    if (response.resultCode === 0) {
        dispatch(follow(id))
        dispatch (setIsFollowed(true))
    }
    dispatch(followingInProgress(false, id))
}
export const unfollowUser = (id) => async (dispatch) => {
    dispatch(followingInProgress(true, id))
    let response = await followApi.unfollowUser(id)
    if (response.resultCode === 0) {
        dispatch(unfollow(id))
        dispatch (setIsFollowed(false))
    }
    dispatch(followingInProgress(false, id))
}
export const resetSearchingForm = () => (dispatch) => {
    dispatch (reset ('searchBar'))
}

