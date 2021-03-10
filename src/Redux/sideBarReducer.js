//SideBar реализован через reducer для тренировки создания редьюсеров.
//Вероятно лучше реализователь его через Хук useState в компоненте или локальный state классового компонента

//изначальные значения части state

let initialState = {
    menuItems: [
        //у каждого пункта есть значение, нужна ли подсказка. Используется в компоненте SideBar для вывода всплывашки
        {id: 1, item: "Profile", needTooltip:false},
        {id: 2, item: "Following", needTooltip:false},
        {id: 3, item: "Users", needTooltip:false},
        {id: 4, item: "Dialogs", needTooltip:true},
        {id: 5, item: "Music", needTooltip:true},


    ]
}

const sideBarReducer = (state = initialState) => {
    return state;
}
export default sideBarReducer;