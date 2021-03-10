import {NavLink} from "react-router-dom";
import React from "react";

const Senders = (props) => {
    let path = '/dialogs/' + props.id;
    return (
        <div>
            <NavLink to={path}> {props.name} </NavLink>
        </div>
    );
}

export default Senders;