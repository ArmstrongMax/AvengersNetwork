import React from 'react';
import './index.css';
import reportWebVitals from './reportWebVitals';
import store from "./Redux/Redux-Store";
import ReactDOM from "react-dom";
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";

//главная и единственная страничка моего SPA. Здесь мы загружаем store в контекст для connect-ов
//browserRouter для реагирование на смену URL
ReactDOM.render(
    <BrowserRouter>
        <React.StrictMode>
            <Provider store={store}>
                <App/>
            </Provider>
        </React.StrictMode>
    </BrowserRouter>,
    document.getElementById('root')
);
reportWebVitals();
