import {authApi, securityApi} from "../API/Api";
import {stopSubmit} from "redux-form";
//константы action-ов.
const SET_USER_DATA = 'auth/SET-USER-DATA';
const GET_CAPTCHA_SUCCESS = 'auth/GET-CAPTCHA-SUCCESS'

//изначальные значения части state
let initialState = {
    //ID текущего пользователя
    currentAuthorizedUserId: null,
    //Его адрес
    email: null,
    //Логин
    login: null,
    //Кто-то авторизован
    isSomeoneAuthorized: false,
    //URL капчи
    captchaImageUrl: null
}
//поскольку reducer реализует концепцию чистых функций, то он внутри себя ничего не менят, а создает копию всего state
//и отдельных переменных, массивов, объектов и прочего через spread-оператор [...]
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        //action-ы установки данных авторизованного пользователя и капчи.
        case SET_USER_DATA:
        case GET_CAPTCHA_SUCCESS: {
            return {...state, ...action.payload}
        }
        default:
            return state;
    }
}
//Action creators
export const setUserData = (currentAuthorizedUserId, email, login, isSomeoneAuthorized) => ({
    type: SET_USER_DATA,
    payload: {currentAuthorizedUserId: currentAuthorizedUserId, email, login, isSomeoneAuthorized: isSomeoneAuthorized}
})

export const getCaptchaImageSuccess = (captchaImageUrl) => ({
    type: GET_CAPTCHA_SUCCESS,
    payload: {captchaImageUrl}
})
//Thunk creators. Через колбэк принимают доп. данные и диспатч
//асинхронная функция для обращения к серверу
export const setAuthorizedUserData = () => async (dispatch) => {
    let response = await authApi.authMe()
    if (response.resultCode === 0) {
        let {id, email, login} = response.data;
        dispatch(setUserData(id, email, login, true))
    }
}
//запрос на авторизацию
export const loginRequest = (email, password, rememberMe, captcha) => {
    return (dispatch) => {
        authApi.loginRequest(email, password, rememberMe, captcha).then(response => {
            if (response.resultCode === 0) {
                dispatch(setAuthorizedUserData())
            } else {//код отвтета от сервера 10 говорит о необходимости ввести капчу
                if (response.resultCode === 10) {
                    dispatch(getCaptchaImageUrl())
                }//если есть какая-то ошибка, то выводим ее
                let errorMessage = response.messages.length > 0 ? response.messages[0] : 'Unknown error'
                dispatch(stopSubmit('login', {_error: errorMessage}))
            }
        })
    }
}
//запрос капчи
export const getCaptchaImageUrl = () => async (dispatch) => {
    const response = await securityApi.getCaptchaImage()
    dispatch(getCaptchaImageSuccess(response.data.url))
}
//запрос на логаут
export const logoutRequest = () => {
    return (dispatch) => {
        authApi.logoutRequest().then(response => {
            if (response.resultCode === 0) {
                dispatch(setUserData(null, null, null, false))
            }
        })
    }
}

export default authReducer;