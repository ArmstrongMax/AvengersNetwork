import React from 'react';
import Pagination from "../Common/Pagination/Pagination";
import User from "./User";
import styles from './Users.module.css'
//общий компнонет для функционала пользователей: страницы и мапинг компонентов под каждого отдельного пользователя.
//количесвто выводимых аккаунтов 5, установлено в initial state и передается при запросе на сервре.
// Пользователь не может менять это значение. На сервере макс. 100
let Users = (props) => {
    return (
        <div>
            <div className={styles.pagination}>
                <hr/>
                <Pagination totalItemsCount={props.totalUsers}
                            usersOnPage={props.usersOnPage}
                            currentPage={props.currentPage}
                            onPageChanged={props.onPageChanged}
                            setCurrentPage={props.setCurrentPage}
                />
                <hr/>
            </div>
            <div>
                {props.users.map(user =>
                    <User key={user.id}
                          id={user.id}
                          photos={user.photos}
                          name={user.name}
                          statusMessage={user.status}
                          followed={user.followed}
                          goingToFollow={props.goingToFollow}
                          unfollowUser={props.unfollowUser}
                          followUser={props.followUser}
                          currentAuthorizedUserId={props.currentAuthorizedUserId}
                    />
                )}
            </div>
        </div>
    )
}
export default Users;