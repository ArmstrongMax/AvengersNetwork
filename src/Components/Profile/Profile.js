import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPosts from "./ProfilePosts/ProfilePosts";
import LoadingCircle from "../Common/LoadingCircle/LoadingCircle";
//компонент профайла. Данные и посты. Если профиль не подгрузился, то показываем загрузочный значок
const Profile = (props) => {
    return (
        props.profile
            ? <div>
                <ProfileInfo
                    profile={props.profile}
                    status={props.status}
                    updateStatus={props.updateStatus}
                    isOwner={props.isOwner}
                    setNewAvatar={props.setNewAvatar}
                    saveProfile={props.saveProfile}
                    followUser={props.followUser}
                    unfollowUser={props.unfollowUser}
                    isFollowed={props.isFollowed}
                />
                {/*поскольку посты не идут на сервре, то возможно писать посты есть только у владельца*/}
                {props.isOwner &&
                <MyPosts profile={props.profile} posts={props.posts} addNewPostAndReset={props.addNewPostAndReset}/>
                }
            </div>
            : <LoadingCircle/>
    );
}
export default Profile;