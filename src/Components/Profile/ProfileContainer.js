import React from 'react';
import Profile from "./Profile";
import {
    getProfileById,
    getUserStatus,
    updateStatus,
    setNewAvatar,
    saveProfile,
    getIsFollowed, addNewPostAndReset
} from "../../Redux/profileReducer";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {withAuthRedirect} from "../../HOC/WithAuthRedirect";
import {getIsFollowedFromState, getPosts, getProfile, getStatus} from "../../Redux/Selectors/profileSelector";
import {getCurrentAuthorizedUserId, getIsSomeoneAuthorized} from "../../Redux/Selectors/authSelector";
import {followUser, unfollowUser} from "../../Redux/usersReducer";
//классовый компонент для использования методов жизненного цикла. Можно реализовать и функц. компонентом с хуком useEffect
class ProfileContainer extends React.Component {
//Функция для раегирования на изменения в профале
    refreshProfile() {
        //ID берем из строки URL
        let userId = this.props.match.params.userId;

        if (!userId) {
            if (this.props.isSomeoneAuthorized) {
                //если в URL нет ID, то берем ID текущего авторизованного юзера
                userId = this.props.currentAuthorizedUserId;
            } else {
                //если такового нет, то редирект на логон
                this.props.history.push('/login')
            }
        }
        //Получив ID запрашиваем профиль, статус, статус дружбы с профилем
        this.props.getProfileById(userId)
        this.props.getUserStatus(userId)
        this.props.getIsFollowed(userId)
    }
//Обновляем компонет при монитровании
    componentDidMount() {
        this.refreshProfile()
    }
//и при изменении. Зависимость обновления: ID из URL (в случае перехода на другой профиль) или смена статуса дружбы
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId !== prevProps.match.params.userId ||
        this.props.isFollowed !== prevProps.isFollowed)
        this.refreshProfile()
    }

    render() {
        return (<Profile {...this.props}
                         profile={this.props.profile}
                         status={this.props.status}
                         updateStatus={this.props.updateStatus}
                         isOwner={this.props.match.params.userId === this.props.currentAuthorizedUserId.toString()}
                         setNewAvatar = {this.props.setNewAvatar}
                         saveProfile={this.props.saveProfile}
                         followUser={this.props.followUser}
                         unfollowUser={this.props.unfollowUser}
                         isFollowed={this.props.isFollowed}

        />)

    }
}
//используем селекторы
let mapStateToProps = (state) => ({
    profile: getProfile(state),
    status: getStatus(state),
    currentAuthorizedUserId: getCurrentAuthorizedUserId(state),
    isSomeoneAuthorized: getIsSomeoneAuthorized(state),
    isFollowed:getIsFollowedFromState(state),
    posts: getPosts(state)
});
//чем оборачиваем компонент: часть state, thunk creators, action creators, withRouter для доступа к history, самописный
//HOC withAuthRedirect для редиректа, если пользователь не залогинен
export default compose(connect(mapStateToProps, {
    getProfileById,
    getUserStatus,
    getIsFollowed,
    updateStatus,
    setNewAvatar,
    saveProfile,
    followUser,
    unfollowUser,
    addNewPostAndReset
}), withRouter, withAuthRedirect)(ProfileContainer);