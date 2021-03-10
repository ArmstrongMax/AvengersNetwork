import React from "react";
import {createField, Input} from "../Common/FormControls/FormControls";
import {reduxForm} from "redux-form";
import error from "../Common/FormControls/FormControls.module.css";
//форма поиска
let SearchBar = (props) => {
    return <form onSubmit={props.handleSubmit}>
        {/*используем заготовленную функция создания формы*/}
        {createField('Find someone by Name or ID', 'searchBar', [], Input)}
        {/*если ошибка, то показываем ее полный текст от сервереа*/}
        {props.error && <div className={error.formCommonError}>{props.error}</div>}
    </form>
}
//обертка redux form с именем формы
const SearchBarForm = reduxForm({form: 'searchBar'})(SearchBar)
export default SearchBarForm