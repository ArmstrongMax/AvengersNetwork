import React, {useState} from 'react';
import LoadingCircle from "../../Common/LoadingCircle/LoadingCircle";
import ProfileStatus from "../ProfileStatus/ProfileStatus";
import ProfileEditDataForm from "../ProfileDataForm/ProfileDataForm";
import styles from './ProfileInfo.module.css'
import ProfileAvatar from "./ProfileAvatar";
import ProfilePersonalInfo from "./ProfilePersonalInfo";
import Contacts from "../Contacts/Contacts";
//компонент с личными данными пользователя. Без постов
const ProfileInfo = (props) => {
    //локальный стейт из хука для переключения режима редактирования
    let [editMode, setEditMode] = useState(false);
    //если профиль пока не подгрузился, то видим символ загрузки
    if (!props.profile) {
        return <LoadingCircle/>
    }
    //Пользователь вибирает одну/несколько фото. Берем первую. Вызываем thunk creator
    let onAvatarSelected = (e) => {
        if (e.target.files.length) {
            props.setNewAvatar(e.target.files[0])
        }
    }
    //При сабмите изменения данных вызываем thunk creator
    let onSubmit = (formData) => {
        props.saveProfile(formData).then(() => {
            //и выключаем режим редактирования
            setEditMode(false)
        })
    }

    return (
        <div>
            <div className={styles.profileMainData}>

                <div className={styles.profileAvatar}>
                    {/*Отображаем аватар*/}
                    <ProfileAvatar profile={props.profile}
                                   onAvatarSelected={onAvatarSelected}
                                   isOwner={props.isOwner}/>
                </div>
{/*Имя*/}
                <div className={styles.profileFullName}>
                    {props.profile.fullName}
                </div>
{/*отображаем компонент статуса*/}
                <div className={styles.profileStatus}>
                    <ProfileStatus className={styles.profileStatusSpan} status={props.status}
                                   updateStatus={props.updateStatus} isOwner={props.isOwner}/>
                    <hr/>
                </div>
{/*отображаем компонент с данными о поиске работы, проф. навыками, о себе и пр.*/}
                <div className={styles.profilePersonalInfo}>
                    <ProfilePersonalInfo profile={props.profile}/>
                    <hr/>
                </div>
            </div>
            {/*если не на своей странице, то показывем кнопку зафоловить/отписаться*/}
            {!props.isOwner &&
            <div className={styles.userFollowUnfollowButton}> {
                props.isFollowed
                    ?
                    <button onClick={() => {
                        props.unfollowUser(props.profile.userId)
                    }}>unfollow</button>
                    :
                    <button onClick={() => {
                        props.followUser(props.profile.userId)
                    }}>follow</button>
            }
            </div>}
{/*Часть с контактами*/}
            <div className={styles.contacts}>
                <Contacts profile={props.profile}/>
                <hr/>
            </div>
{/*Если в режиме редактирования, то отображаем форму реактирования*/}
            {editMode &&
            <ProfileEditDataForm onSubmit={onSubmit} initialValues={props.profile} profile={props.profile}/>}
{/*если на своей странице и режим редактирования не включен, то показавыем кнопку для входа в режим редактирования*/}
            {props.isOwner && !editMode &&
            <div className={styles.profileEditInfoButton}>
                <button onClick={() => {
                    setEditMode(true)
                }}>Edit profile info
                </button>
            </div>}
            <hr/>
        </div>
    );
}
export default ProfileInfo;
