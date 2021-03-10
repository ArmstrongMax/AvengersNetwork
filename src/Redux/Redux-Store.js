import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";
import sideBarReducer from "./sideBarReducer";
import usersReducer from "./usersReducer";
import authReducer from './authReducer';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import appReducer from "./appReducer";
//Объединяем все редьюсеры, в т.ч. redux form, т.к. он имеет свой state, dispatch и согласуется с flux круговоротом
let reducers = combineReducers({
    profilePage : profileReducer,
    dialogsPage : dialogsReducer,
    sideBar:sideBarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});
//обертка для подключения расширения chrome REDUX DEVTOOLS, тот в свою очеред подключает средний уровень thunkMiddleware
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers,composeEnhancers(applyMiddleware(thunkMiddleware)
));
//весь store - это редьюсеры от каждой логической части (профиль, юзеры, авторизация и пр.) и  middleware-ы
export default store;