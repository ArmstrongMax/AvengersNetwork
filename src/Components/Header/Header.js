import React from 'react';
import styles from './Header.module.css';
import {NavLink, withRouter} from "react-router-dom";
import SearchBarForm from "./SearchBar";
import {compose} from "redux";
import Logo from '../Assets/Images/Logo.png'
//шапка.

const Header = (props) => {
    //функция, срабатывающая при вводе данных в форму поиска
    let findUser = (value) => {
        //проверка не ищет ли пользователя по ID (т.е. числу)
        if (Number.isNaN(Number(value.searchBar))) {
            //если в поиске не номер, то делаем запрос с текстом из поля
            props.requestUsers(1, null, false, value.searchBar)
            //и переходим на страницу Users для демонстрации результатов
            if (props.history.location.pathname !== '/Users') {
                props.history.push('/Users')
            }
        } else {
            //если номер, то сразу переходим на страницу пользваоетя с указанным ID.
            // Проверка на отстувие введеного ID присходит при запросе на сервер
            props.history.push(`/Profile/${value.searchBar}`)
        }
        //вызов Thunk creator-а для очитски поля ввода
        props.resetSearchingForm()
    }

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                {/*при нажатии на лого переходим на приветственную страницу*/}
                <NavLink to={'/'}>
                    <img src={Logo} alt="logo"/>
                </NavLink>
            </div>
            <div className={styles.searchBarForm}>
                {/*отображении формы для поиска с передачий функции при вводе*/}
                <SearchBarForm onSubmit={findUser}/>
            </div>
            <div className={styles.currentUserInfo}>
                {/*если кто-то залогинен, то показываем его никнейм, кнопу выхода*/}
                {props.isSomeoneAuthorized
                    ? <div className={styles.nicknameAndButton}>
                        <div className={styles.currentUserLogin}>{props.login}</div>
                        <button className={styles.logoutButton} onClick={props.logoutRequest}>Logout</button>
                    </div>
                    // если нет, то ссылка на страницу логона
                    : <NavLink className={styles.loginFormRef} to='/login'>Login</NavLink>}
            </div>
        </header>
    );
}
//роутер нужен для взаимодейсвтия с историей браузера history.location и .history.push
export default compose(withRouter)(Header);