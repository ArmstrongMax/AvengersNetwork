import React from "react";
import styles from './Contacts.module.css'
//компонент отдельно взятого контакта с деструктуризацией пропов
let Contact = ({contactTitle, contactValue}) => {
    return <div>
        <div>{contactTitle}</div>
        <div className={styles.contactValue}>{contactValue}</div>
    </div>
}
export default Contact