import React from "react";
import styles from './Post.module.css'
//компонент с написанным постом
const Post = (props) => {
    return (
        <div className={styles.post}>
            <div className={styles.authorsAvatar}>
                <img src={props.avatar} alt=''/>
            </div>
            <div className={styles.postContent}>
                {props.post}
            </div>
        </div>
    );
}
export default Post;