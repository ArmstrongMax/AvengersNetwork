//Редьюсер диалогов тестовый, без взаимодейсвтия с сервером.
//константы action-ов.
const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY'
//изначальные значения части state
let initialState = {
    senders:
        [
            {id: 1, name: 'Steve Rogers'},
            {id: 2, name: 'Thor Odinson'},
            {id: 3, name: 'Bruce Banner'}

        ],
    messages:
        [
            {id: 1, message: 'Hey'},
            {id: 2, message: 'Aloha'},
            {id: 3, message: "React"}
        ],
    newMessageBody: ''
};
//поскольку reducer реализует концепцию чистых функций, то он внутри себя ничего не менят, а создает копию всего state
//и отдельных переменных, массивов, объектов и прочего через spread-оператор [...]
const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case SEND_MESSAGE: {
            let message = {id: 4, message: action.message}
            return ({...state, messages: [...state.messages, message]})
        }

        case UPDATE_NEW_MESSAGE_BODY: {
            return {
                ...state,
                newMessageBody: action.newBody
            };
        }
        default:
            return state;
    }
}
//Action creators
export const sendMessageActionCreator = (message) => ({type: SEND_MESSAGE, message: message})
export const updateNewMessageBodyActionCreator = (newBody) => ({type: UPDATE_NEW_MESSAGE_BODY, newBody: newBody});
export default dialogsReducer;