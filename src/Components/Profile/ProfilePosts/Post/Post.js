import React from "react";
import styles from './Post.module.css'
import defaultIcon from '../../../Assets/Images/userDefaultIcon.png'
//компонент с написанным постом
const Post = (props) => {
    return (
        <div className={styles.post}>
            <div className={styles.authorsAvatar}>
                <img src={props.avatar || defaultIcon} alt=''/>
            </div>
            <div className={styles.postContent}>
                {props.post}
            </div>
        </div>
    );
}
export default Post;