import userDefaultIconLarge from "../../Assets/Images/userDefaultIconLarge.png";
import React from "react";
//компонент с аватаром
let ProfileAvatar = (props) => {
    return <label>
        <img
            //если фото нет то стандартная картинка
            src={props.profile.photos.large || userDefaultIconLarge}
            alt="avatar"
            title={props.isOwner && "Нажмите, чтобы изменить изображение"}/>
            {/*обработка нажатия на фото для смены*/}
        {props.isOwner && <input type={'file'} onChange={props.onAvatarSelected} hidden/>}
    </label>
}
export default ProfileAvatar