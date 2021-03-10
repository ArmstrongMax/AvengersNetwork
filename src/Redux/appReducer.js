import {setAuthorizedUserData} from "./authReducer";
//константа action-ов.
const SET_INITIALIZED = 'app/SET-INITIALIZED';
//изначальные значения части state
let initialState = {
    //обзая переменная для индикации загрузилось ли приложение или нет. Для вывода загрузочного кружка,
    // а не просто белого экрана
    isInitialized: false
}
//поскольку reducer реализует концепцию чистых функций, то он внутри себя ничего не менят, а создает копию всего state
//и отдельных переменных, массивов, объектов и прочего через spread-оператор [...]
const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZED: {
            //приложение проинициализировалось - меняем на true
            return {...state, isInitialized: true}
        }
        default:
            return state;
    }
}
//Action creators
export const setInitialized = () => ({type: SET_INITIALIZED});
//Thunk creators
export const initializeApp = () => (dispatch) => {
    dispatch(setAuthorizedUserData()).then(() => {
        dispatch(setInitialized())
    })
}

export default appReducer;