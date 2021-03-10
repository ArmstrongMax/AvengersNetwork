import Contact from "./Contact";
import React from "react";
import styles from './Contacts.module.css'
//компонент со списков компонент отдельных контактов
let Contacts = (props) => {
    return <div>
        {/*строка проверки на случай, если ни один из контактов не указан. Тогда и надпись "контаткты" не показывается*/}
        {Object.keys(props.profile.contacts).some(elem => props.profile.contacts[elem] !== null && props.profile.contacts[elem] !== "") &&
        <div className={styles.contactsLabel}>
            Contacts
        </div>}
        <div>
            {/*контакты с сервера приходя как объект. Используем Object.keys для взятия ключей и значений этого объекта*/}
            {Object.keys(props.profile.contacts).map(key => {
                if (props.profile.contacts[key])
                    return <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]}/>
                else return null
            })}
        </div>
    </div>
}
export default Contacts