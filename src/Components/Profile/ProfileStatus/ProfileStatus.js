import React, {useEffect, useState} from "react";
import styles from './ProfileStatus.module.css'
import {createField, Input} from "../../Common/FormControls/FormControls";
import {maxLengthCustom} from "../../../Utils/Validators/Validators";
import {Form, reduxForm} from "redux-form";
//переменная максимальной длины статуса (300 на сервере)
let maxLength = maxLengthCustom(300)

const ProfileStatus = (props) => {
    //локальный стейт текста статуса и переключения режима его редактирования. Хуки
    let [status, setStatus] = useState(props.status);
    let [editMode, setEditMode] = useState(false);
//включение режима редактирования
    let editModeOn = () => {
        setEditMode(true)
    }
    //выключение режима редактирования и вызов thunk-creator
    let editModeOff = (status) => {
        setEditMode(false)
        props.updateStatus(status.editStatus)
    }
    //Хук для реагирования на смену статуса на сервере и перерисовки
    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    return <div className={styles.statusForm}>
        {/*только владелец может менять статус*/}
        {props.isOwner
            ? <div>
                {!editMode &&
                <div>
                        <span title={'Нажмите, чтобы изменить статус'}
                              onClick={editModeOn}>{props.status || "What's new?"}</span>
                </div>
                }
                {/*если режим редактирования то показываем поле ввода*/}
                {editMode &&
                <div>
                    <EditStatusFormReduxForm onSubmit={editModeOff} initialValues={{editStatus: status}}/>
                </div>}
            </div>
            : <span>{props.status || "Here could be status"}</span>}
    </div>
}
//форма для ввода. Используем самописную функцию для формы с валидацией макс. размера
let EditStatusForm = (props) => {
    return <Form onSubmit={props.handleSubmit}>
        {createField("Tell something", 'editStatus', maxLength, Input)}
    </Form>
}
//обертка redux form с именем формы
const EditStatusFormReduxForm = reduxForm({form: 'editStatus'})(EditStatusForm)
export default ProfileStatus;