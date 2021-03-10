//селекторы из редьюсера юзеров. Пока бесполезно.
// Сделано на случай усложнения селекторов и применения библеотеки reselect

export const getUsers = (state) => {
    return state.usersPage.users
}
export const getTotalUsers = (state) => {
    return state.usersPage.totalUsers
}
export const getCurrentPage = (state) => {
    return state.usersPage.currentPage
}
export const getUsersOnPage = (state) => {
    return state.usersPage.usersOnPage
}
export const getIsLoading = (state) => {
    return state.usersPage.isLoading
}
export const getGoingToFollow = (state) => {
    return state.usersPage.goingToFollow
}
export const getSearchingUserName = (state) => {
    return state.usersPage.searchingUserName
}
