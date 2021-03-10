import {followApi, profileApi} from "../API/Api";
import {reset, stopSubmit} from "redux-form";
//константы action-ов.
const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET-USER-PROFILE';
const SET_USER_STATUS = 'profile/SET-USER-STATUS';
const SET_NEW_AVATAR_SUCCESS = 'profile/SET-NEW-AVATAR-SUCCESS';
const SET_ISFOLLOWED = 'profile/SET-ISFOLLOWED';
//изначальные значения части state
let initialState = {
    //посты. Пока только локальо
    posts:
        [],
    //профайл. приходит как объект
    profile: null,
    //статус
    status: "",
    //фоловим ли юзера
    isFollowed: null
}
//поскольку reducer реализует концепцию чистых функций, то он внутри себя ничего не менят, а создает копию всего state
//и отдельных переменных, массивов, объектов и прочего через spread-оператор [...]
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            //добавление поста. приходит текст поста
            let post = {
                post: action.newPostText,
                };
            return {
                ...state,
                newPostText: "",
                posts: [...state.posts, post]
            };
        }
        case SET_USER_PROFILE: {
            return ({...state, profile: action.profile})
        }
        case SET_USER_STATUS: {
            return ({...state, status: action.status})
        }
        case SET_NEW_AVATAR_SUCCESS: {
            return {...state, profile: {...state.profile, photos: action.photos}}
        }
        case SET_ISFOLLOWED: {
            return ({...state, isFollowed: action.isFollowed})
        }
        default:
            return state;

    }
}
//Action Creators
export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText: newPostText})
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setUserStatus = (status) => ({type: SET_USER_STATUS, status});
export const setIsFollowed = (isFollowed) => ({type: SET_ISFOLLOWED, isFollowed})
export const setNewAvatarSuccess = (photos) => ({type: SET_NEW_AVATAR_SUCCESS, photos})

//Thunk Creators.Через колбэк принимают доп. данные и диспатч

export const getProfileById = (id) => async (dispatch) => {
    let response = await profileApi.getProfile(id)
   //если ошибки поиска нет, то устанавливаем данные юзера
    if (response !== "User with this ID does not exists") {
        dispatch(setUserProfile(response.data))
    } else { //при поиске конкретного ID которого нет, приходит ошибка от серврера. показываем ее
        dispatch(stopSubmit('searchBar', {_error: response}))
        return Promise.reject(response)
    }
}
export const getUserStatus = (id) => async (dispatch) => {
    let response = await profileApi.getStatus(id)
    dispatch(setUserStatus(response.data))
}
export const getIsFollowed = (id) => async (dispatch) => {
    let response = await followApi.getIsFollowed(Number(id))
    dispatch(setIsFollowed(response))
}

export const updateStatus = (status) => async (dispatch) => {
    let response = await profileApi.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setUserStatus(status))
    }
}
export const setNewAvatar = (file) => async (dispatch) => {
    let response = await profileApi.setNewAvatar(file)
    if (response.data.resultCode === 0) {
        dispatch(setNewAvatarSuccess(response.data.data.photos))
    }
}
export const saveProfile = (profile) => async (dispatch, getState) => {
    let response = await profileApi.saveProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(getProfileById(getState().auth.currentAuthorizedUserId))
    } else {
        //если сервре не принял данные, то он вернет ошибку. Ее и выводим
        dispatch(stopSubmit('edit-profile', {_error: response.data.messages[0]}))
        return Promise.reject(response.data.messages[0])
    }
}

export const addNewPostAndReset = (newPostText) => (dispatch) => {
    dispatch(addPostActionCreator(newPostText))
    dispatch(reset('newPost'))
}
export default profileReducer;
