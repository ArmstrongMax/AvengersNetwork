import React from "react";
import styles from './UsedTechnologies.module.css'
//используемые концепции и технологии
let UsedTechnologies = () => {
    return <div className={styles.usedTechnologies}>

        <div className={styles.header}>
            <h1>Used Technologies</h1>
            <p>Here is a list of technologies and concepts used in the project</p>
        </div>

        <div className={styles.technologies}>
            <h4>Technologies</h4>
            <ul>
                <li>React</li>
                <li>Redux</li>
                <li>Create react app</li>
                <li>HTML5</li>
                <li>CSS3 (modules)</li>
                <li>Browser Router</li>
                <li>Context, Connect (React-Redux)</li>
                <li>Ajax (Axios)</li>
                <li>Thunk (midleware)</li>
                <li>Hooks (Use state, Use effect)</li>
                <li>Redux form + validation, stop submit</li>
                <li>Browser extensions (React developer tools, Redux dev tools)</li>
                <li>Classnames</li>
                <li>Compose</li>
            </ul>
        </div>

        <div className={styles.concepts}>
            <h4>Concepts</h4>
            <ul>
                <li>Single page application</li>
                <li>FLUX</li>
                <li>REST</li>
                <li>Class components (life cycle methods)</li>
                <li>Pure functions and Pure components</li>
                <li>Selectors</li>
                <li>High order component (HOC)</li>
            </ul>
        </div>
    </div>
}
export default UsedTechnologies