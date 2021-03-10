import React from 'react';
import Header from "./Header";
import {connect} from "react-redux";
import {logoutRequest} from "../../Redux/authReducer";
import {requestUsers, resetSearchingForm} from "../../Redux/usersReducer";
import {getProfileById} from "../../Redux/profileReducer";

class HeaderComponent extends React.Component {
    render() {
        return <Header {...this.props}/>
    }
}
//что берем из reducer-а
const mapStateToProps = (state) => ({
    isSomeoneAuthorized: state.auth.isSomeoneAuthorized,
    login: state.auth.login
});
//чем оборачиваем компонент: часть state, thunk creators, action creators
export default connect(mapStateToProps, {
    logoutRequest,
    requestUsers,
    getProfileById,
    resetSearchingForm
})(HeaderComponent);