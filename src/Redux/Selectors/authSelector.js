//селекторы из редьюсера авторизации. Пока бесполезно.
// Сделано на случай усложнения селекторов и применения библеотеки reselect

export const getCurrentAuthorizedUserId = (state) => {
    return state.auth.currentAuthorizedUserId
}
export const getEmail = (state) => {
    return state.auth.email
}
export const getLogin = (state) => {
    return state.auth.login
}
export const getIsSomeoneAuthorized = (state) => {
    return state.auth.isSomeoneAuthorized
}
export const getCaptchaImageUrl = (state) => {
    return state.auth.captchaImageUrl
}
