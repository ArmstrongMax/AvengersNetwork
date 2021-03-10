import {NavLink} from "react-router-dom";
import userDefaultIcon from "../Assets/Images/userDefaultIcon.png";
import React from "react";
import styles from './User.module.css'
//компонент для каждого юзера
let User = (props) => {
    return <div className={styles.userContainer}>
        <div className={styles.userAvatar}>
            {/*каждый аватар - ссылка на станицу профиля этого пользователя. Id передается в URL.*/}
            <NavLink to={'/profile/' + props.id}>
                <img className={styles.userAvatarPicture}
                     //Если у пользователя нет аватарки, то картинка по умолчанию.
                     src={props.photos.small != null ? props.photos.small : userDefaultIcon} alt={''}/>
            </NavLink>
        </div>
        {/*показываем имя, статус*/}
        <div className={styles.userName}>
            {props.name}
        </div>
        <div className={styles.userStatus}>
            {props.statusMessage}
        </div>
        {/*Если ID текущего пользователя не равен ID просматриваемого пользователя, то показываем кнопки
        follow/unfollow. Проверка нужная для предотвращения подписки/отписки на себя самого. */}
        {props.currentAuthorizedUserId !== props.id &&
        <div className={styles.userFollowUnfollowButton}> {
            //если фоловим, то кнопка отписки и наоборот
            props.followed
                ?
                //как только нажимаем кнопку, id пользователя, с которым проводим операцию добавляется в массив в state
                //кнопка отключается до тех пор, пока id в массиве. Для предотвращения беспорядочного нажимания на кнопку.
                //после окончания процедуры id из массива удаляется и кнопка снова доступна
                <button disabled={props.goingToFollow.some(id => id === props.id)} onClick={() => {
                    props.unfollowUser(props.id)
                }}>unfollow</button>
                :
                <button disabled={props.goingToFollow.some(id => id === props.id)} onClick={() => {
                    props.followUser(props.id)
                }}>follow</button>
        }
        </div>
        }
    </div>
}

export default User