import React from "react";
import styles from './FormControls.module.css'
import {Field} from "redux-form";

//переписанный textarea, чтобы отображать ошибки валидации
export const Textarea = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error
    return <div className={styles.formControls + " " + (hasError ? styles.error : "")}>
        <textarea {...input}{...props}/>
        {hasError && <span>{meta.error}</span>}
    </div>
}
//переписанный input, чтобы отображать ошибки валидации
export const Input = ({input, meta, ...props}) => {
    const hasError = meta.touched && meta.error
    return <div className={styles.formControls + " " + (hasError ? styles.error : "")}>
        <input className={styles.input} {...input}{...props}/>
        {hasError && <span>{meta.error}</span>}
    </div>
}
//отдельная фнкция для создания Field от Redux Form. При вызове достаточно переать нужные параметры.
export const createField = (placeholder, name, validators, component, props = {}, text = "") => {
    return <div>
        <Field placeholder={placeholder}
               validate={validators}
               name={name}
               component={component}
               {...props}/>
        {text}
    </div>
}