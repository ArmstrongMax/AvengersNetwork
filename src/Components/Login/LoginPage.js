import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {loginRequest} from "../../Redux/authReducer";
import {Redirect} from "react-router-dom";
import {createField, Input} from "../Common/FormControls/FormControls";
import {requiredField} from "../../Utils/Validators/Validators";
import styles from '../Common/FormControls/FormControls.module.css'
import {
    getCaptchaImageUrl,
    getCurrentAuthorizedUserId,
    getIsSomeoneAuthorized
} from "../../Redux/Selectors/authSelector";
import stylesLog from './LoginPage.module.css'

const LoginForm = (props) => {
    return (
        /*форма полей для логона с фалидацией "обязательное поле" из файла Validators. Общая функция для создания не используется"*/
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder="E-mail" component={Input} name={"email"} validate={[requiredField]}/>
            </div>
            <div>
                <Field placeholder="Password" component={Input} type="password" name={"password"}
                       validate={[requiredField]}/>
            </div>
            <div>
                <Field component={Input} type="checkbox" name={"rememberMe"}/> Remember me
            </div>
            {/*если ошибка, то показываем ее полный текст от сервреа*/}
            {props.error && <div className={styles.formCommonError}>{props.error}</div>}
            {/*на сервере реализована капча для подозрительных дейсвтий*/}
            {props.captchaImageUrl && <img src={props.captchaImageUrl} alt={''}/>}
            {/*при необходимости выходит сама капча и поле для ввода*/}
            {props.captchaImageUrl && createField(null, 'captcha', requiredField, Input)}
{/*кнопка сабмита*/}
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}
//обертка redux form с именем формы
const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

const LoginPage = (props) => {
    //при сабмите вызывается thunk creator для авторизации
    const onSubmit = (formData) => {
        props.loginRequest(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    //если кто-то авторизован, то редирект на страиуц пользователя
    if (props.isSomeoneAuthorized) {
        return <Redirect to={`/Profile/${props.currentAuthorizedUserId}`}/>
    }
    //если нет, то отображается страница логона
    return <div className={stylesLog.login}>
        <div>
            <h1>Login</h1>
        </div>
        <div>
            <LoginReduxForm onSubmit={onSubmit} captchaImageUrl={props.captchaImageUrl}/>
        </div>
    </div>
}

const mapStateToProps = (state) => ({
    isSomeoneAuthorized: getIsSomeoneAuthorized(state),
    captchaImageUrl: getCaptchaImageUrl(state),
    currentAuthorizedUserId: getCurrentAuthorizedUserId(state)
})
//чем оборачиваем компонент: часть state, thunk creators, action creators
export default connect(mapStateToProps, {loginRequest})(LoginPage);

