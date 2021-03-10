import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

let mapStateToPropsForRedirect = (state) => ({
    isSomeoneAuthorized: state.auth.isSomeoneAuthorized
})
//ХОК для реализации редиректа в случае, если нет залогиненного пользователя.
export const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isSomeoneAuthorized) return <Redirect to={'/login'}/>
            return <Component {...this.props} />
        }
    }

    return connect(mapStateToPropsForRedirect)(RedirectComponent)
}