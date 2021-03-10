//селекторы из редьюсера профайла. Пока бесполезно.
// Сделано на случай усложнения селекторов и применения библеотеки reselect

export const getProfile = (state) => {
    return state.profilePage.profile
}

export const getStatus = (state) => {
    return state.profilePage.status
}
export const getIsFollowedFromState = (state) => {
    return state.profilePage.isFollowed
}
export const getPosts = (state) => {
    return state.profilePage.posts
}