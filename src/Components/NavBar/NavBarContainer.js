import NavBar from "./NavBar";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        sideBar: state.sideBar,
        currentAuthorizedUserId: state.auth.currentAuthorizedUserId
    }
};
//чем оборачиваем компонент: часть state, thunk creators, action creators
export default connect(mapStateToProps, null)(NavBar)