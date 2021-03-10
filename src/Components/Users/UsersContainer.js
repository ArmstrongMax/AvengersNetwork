import React from 'react';
import {connect} from "react-redux";
import {
    follow,
    unfollow,
    setCurrentPage,
    followingInProgress,
    requestUsers,
    followUser,
    unfollowUser, setSearchingUserName
} from "../../Redux/usersReducer";
import Users from "./Users";
import LoadingCircle from "../Common/LoadingCircle/LoadingCircle";
import {
    getCurrentPage,
    getGoingToFollow,
    getIsLoading, getSearchingUserName,
    getTotalUsers,
    getUsers,
    getUsersOnPage
} from "../../Redux/Selectors/usersSelectors";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import styles from './Users.module.css'
import {getCurrentAuthorizedUserId} from "../../Redux/Selectors/authSelector";
import {withAuthRedirect} from "../../HOC/WithAuthRedirect";
//классовый компонет-обертка для страницы пользователей. Используем методы жизн. цикла.
// Страница пользователей реализует 3 функции:
// Демонистрирует всех пользователей на серврере (Users),
// зафоловленных пользователей (Following) и выводит результаты
// поиска по имени/ID. Можно было вивести страницу друзей в отеьный компонент,
// но т.к. используется оидн раздел API (usersApi) функции выведены в один раздел.
class UsersContainer extends React.Component {
//Если на странице Following, т.е. смотрим друзей, то показываются пользователи с меткой following.
// В остальном функционал идентичен Users
    areWeLookingForAFriends() {
        //из URL при помощи withRouter берем значение выбранной страницы
        if (this.props.match.url === '/Following') {
            return true
        }
    }
//при монтировании делаем запрос за всеми пользователями (+ ищем всех или только друзей)
    componentDidMount() {
        this.props.requestUsers(1, this.props.usersOnPage, this.areWeLookingForAFriends(), this.props.searchingUserName);
    }
//при изменении отображаемой страницы пользователей делаем новый запрос (Pagination)
    onPageChanged = (pageNumber) => {
        this.props.requestUsers(pageNumber, this.props.usersOnPage, this.areWeLookingForAFriends(), this.props.searchingUserName);
    }

    render() {
        return <>
            {/*Если не загрузили список, то показываем загрузочный кружок*/}
            {this.props.isLoading ? <LoadingCircle/> : <div>{null}</div>}
            {/*если перешли сюда из поиска, то есть имя поиска,
            то происходит вывод пользователей подходящих по критерию. Поисковый запрос записывается в reducer*/}
            {this.props.searchingUserName !== null &&
            <div className={styles.searchingResultData}>
                {/*Выводим информацию о результате поиска*/}
                <div>Found {this.props.totalUsers} users with name {this.props.searchingUserName}</div>
                <div>
                    {/*также показываем кнопку для сброса результатов поиска и диспатчим обнуление поискового запроса
                    и делаем общий запрос за пользователями*/}
                    <button onClick={() => {
                        this.props.setSearchingUserName(null)
                        this.props.requestUsers(this.props.currentPage, this.props.usersOnPage, this.areWeLookingForAFriends(), null)
                    }}>Clear searching results
                    </button>
                </div>
            </div>}
{/*рисуем компонент Пользователи и передаем через пропсы все нужное*/}
            <Users
                users={this.props.users}
                totalUsers={this.props.totalUsers}
                usersOnPage={this.props.usersOnPage}
                currentPage={this.props.currentPage}
                unfollow={this.props.unfollow}
                follow={this.props.follow}
                onPageChanged={this.onPageChanged}
                goingToFollow={this.props.goingToFollow}
                followingInProgress={this.props.followingInProgress}
                followUser={this.props.followUser}
                unfollowUser={this.props.unfollowUser}
                setCurrentPage={this.props.setCurrentPage}
                currentAuthorizedUserId={this.props.currentAuthorizedUserId}
            />
        </>
    }
}
//что берем из State с помощью самописных селекторов. В дальнейшем возможна реализация сложных селекторов с библиотекой
// Reselect
let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        totalUsers: getTotalUsers(state),
        currentPage: getCurrentPage(state),
        usersOnPage: getUsersOnPage(state),
        isLoading: getIsLoading(state),
        goingToFollow: getGoingToFollow(state),
        searchingUserName: getSearchingUserName(state),
        currentAuthorizedUserId: getCurrentAuthorizedUserId(state)
    }
};

//чем оборачиваем контейнерный компонент: часть state, thunk creators, action creators, withROuter для доступа к истории
//и самописным ХОКом для защиты от неавторизованных пользователей.
export default compose(connect(
    mapStateToProps,
    {
        follow,
        unfollow,
        setCurrentPage,
        followingInProgress,
        requestUsers,
        followUser,
        unfollowUser,
        setSearchingUserName
    }), withRouter, withAuthRedirect)(UsersContainer);
