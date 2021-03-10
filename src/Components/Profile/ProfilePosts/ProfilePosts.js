import React from 'react'
import Post from './Post/Post'
import {reduxForm} from "redux-form";
import {maxLengthCustom, requiredField} from "../../../Utils/Validators/Validators"
import {createField, Textarea} from "../../Common/FormControls/FormControls"
import styles from './ProfilePosts.module.css'
//переменная с максимальной длиной поста. Для валидации
let maxLength = maxLengthCustom(50)
//компонент с постами: поле ввода и сами посты. Пока на сервер не идут. Изменения только в UI и BLL
const ProfilePosts = (props) => {

    let postsItems = props.posts.map(p => <Post key={p.id} post={p.post} avatar={props.profile.photos.small}/>)
    let addPost = (values) => {
        props.addNewPostAndReset(values.newPost)
    }

    return (
        <div>
            <div className={styles.label}>
                Posts
            </div>
            <div className={styles.newPostForm}>
                <div className={styles.authorsAvatar}>
                    <img src={props.profile.photos.small} alt={''}/>
                </div>
                <div className={styles.postsForm}>
                    <NewPostReduxForm onSubmit={addPost}/>
                </div>
            </div>
            {postsItems}
        </div>
    );
}
//форма нового поста с фото текущ. пользователя
const NewPostForm = (props) => {
    //текст "всплывашки" для пояснения возможностей постов
    let tooltip = "For now, posts are just a concept of how they will look using Redux Forms. " +
        "This post will not be added to the server due to API limitation. " +
        "But this option is under development."
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={styles.form}>
                <div className={styles.textarea}>
                    {/*самописная функция для создания формы*/}
                    {createField("What's new?", 'newPost', [requiredField, maxLength], Textarea,)}
                </div>
                <div className={styles.addButtonArea}>
                    {/*кнопка добавления*/}
                    <button className={styles.addButton} data-tooltip={tooltip}>Add</button>
                </div>
            </div>
        </form>
    )
}
//обертка redux form с именем формы
const NewPostReduxForm = reduxForm({form: 'newPost'})(NewPostForm)

export default ProfilePosts;