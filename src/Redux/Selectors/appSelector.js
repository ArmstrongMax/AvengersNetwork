//селектор из редьюсера app. Пока бесполезно.
// Сделано на случай усложнения селекторов и применения библеотеки reselect

export const getIsInitialized = (state) => {
    return state.app.isInitialized
}