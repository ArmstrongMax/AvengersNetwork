import styles from "./ProfileInfo.module.css";
import React from 'react';
//компонент с личными данными
let ProfilePersonalInfo = (props) => {
    return <div>
        <div className={styles.profileAboutMe}>
            <div className={styles.labelOfItem}>About me</div>
            {props.profile.aboutMe}
        </div>
        <div className={styles.profileLookingForAJob}>
            <div className={styles.labelOfItem}>Looking for a job</div>
            {props.profile.lookingForAJob ? 'Hell yeah' : 'Fortunately not'}
        </div>
        <div>
            {props.profile.lookingForAJob &&
            <div className={styles.profileLookingForAJobDescription}>
                <div className={styles.labelOfItem}>My professional skills</div>
                {props.profile.lookingForAJobDescription}
            </div>}
        </div>
    </div>
}

export default ProfilePersonalInfo