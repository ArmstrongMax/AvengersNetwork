import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import store from "./Redux/Redux-Store";
import ReactDOM from "react-dom";
import App from "./App";
import {HashRouter} from "react-router-dom";
/*import {BrowserRouter} from "react-router-dom";*/
import {Provider} from "react-redux";

//главная и единственная страничка моего SPA. Здесь мы загружаем store в контекст для connect-ов
//browserRouter для реагирование на смену URL
ReactDOM.render(
    /*<BrowserRouter>*/
    //Проект ля демонстрации размещается на github pages, но эта платформа некорректно работет с Browser Router,
    // исключительно для деплоя Browser Router заменен на Hash Router. С его якорями github pages работает хорошо
    <HashRouter>
        <React.StrictMode>
            <Provider store={store}>
                <App/>
            </Provider>
        </React.StrictMode>
    </HashRouter>
    /*</BrowserRouter>*/,
    document.getElementById('root')
);
reportWebVitals();
