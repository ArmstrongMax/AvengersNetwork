import React from 'react';
import {Redirect} from "react-router-dom";
import {compose} from "redux";
import {withAuthRedirect} from "../../HOC/WithAuthRedirect";
//в процесса разработки. Будет поддержка музыкальных медифайлов. Пока редирект
const Music = () => {
    return <Redirect to={'/InProgress'}/>
}
export default compose (withAuthRedirect)(Music);