import React from 'react';
import {NavLink} from "react-router-dom";
import styles from './NavBar.module.css'
import cn from 'classnames';
//навигация по разделам приложения
const NavBar = (props) => {
    //переменная с текстом "всплывашки"
    let tooltip = "Coming soon!"
    //мапим пункты из reducer-а
    let menuItems = props.sideBar.menuItems.map(m => {
        return <div key={m.id}>
            {/*используем classname для активации всплывашку на нужных пунктах*/}
            {/*если кликаем на профайл, то подставляет ID текущего пользователя в адрес*/}
            <NavLink
                className={cn(styles.navItem, {[styles.navItemWithTooltip]: m.needTooltip === true})}
                data-tooltip={tooltip}
                to={m.item === 'Profile'
                    ? '/' + m.item + '/' + props.currentAuthorizedUserId
                    : '/' + m.item}>{m.item}</NavLink>
        </div>
    })
    return <nav className={styles.navBar}>
        {menuItems}
    </nav>
}

export default NavBar;