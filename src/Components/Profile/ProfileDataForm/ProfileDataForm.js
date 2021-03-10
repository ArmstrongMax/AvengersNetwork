import React from "react";
import {Form, reduxForm} from "redux-form";
import {createField, Input, Textarea} from "../../Common/FormControls/FormControls";
import error from "../../Common/FormControls/FormControls.module.css";
import styles from './ProfileDataForm.module.css'
//форма для изменнеи я личных данных
let ProfileEditDataForm = (props) => {
    return <Form onSubmit={props.handleSubmit}>
        <div className={styles.form}>
            <div className={styles.saveButton}>
                <button>Save</button>
            </div>
            {/*если ошибка, то показываем ее полный текст от сервера*/}
            {props.error && <div className={error.formCommonError}>{props.error}</div>}

            <div>
                <div>
                    <h4>Full Name</h4>
                </div>
                {createField('Full name', 'fullName', [], Input)}
            </div>

            <div>
                <div>
                    <h4>Looking for a job</h4>
                </div>
                {createField('', 'lookingForAJob', [], Input, {type: 'checkbox'})}
            </div>
            <div>
                <div>
                    <h4>My professional skills (if looking for a job)</h4>
                </div>
                {createField('Whats your skills?', 'lookingForAJobDescription', [], Textarea)}
            </div>
            <div>
                <div>
                    <h4>About me</h4>
                </div>
                {createField('Tell something about yourself', 'aboutMe', [], Textarea)}
            </div>

            <div>
                <div>
                    <h4>Contacts</h4>
                </div>
                {/*мапим поле изменения каждого контакта по ключам*/}
                {Object.keys(props.profile.contacts).map(key => {
                    return <div className={styles.contactLabel}>
                        {key} {createField(key, 'contacts.' + key, [], Input)}
                    </div>
                })}
            </div>
        </div>
    </Form>
}
//обертка redux form с именем формы
const ProfileDataFormReduxForm = reduxForm({form: 'edit-profile'})(ProfileEditDataForm)
export default ProfileDataFormReduxForm