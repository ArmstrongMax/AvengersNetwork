import {sendMessageActionCreator, updateNewMessageBodyActionCreator} from "../../Redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {compose} from "redux";
import {withAuthRedirect} from "../../HOC/WithAuthRedirect";

let mapStateToProps = (state) => {

    return {
        dialogsPage: state.dialogsPage
    }
};
let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (message) => {
            dispatch(sendMessageActionCreator(message));
        },
        updateNewMessageBody: (newBody) => {
            dispatch(updateNewMessageBodyActionCreator(newBody))
        }
    }
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withAuthRedirect)(Dialogs);





