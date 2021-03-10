import React from "react";
import styles from './WelcomePage.module.css'
import {NavLink} from "react-router-dom";
//приветсвтенная страница
let WelcomePage = () => {
    return <div className={styles.welcomePage}>
        <div className={styles.greetings}>
            <h1>Welcome to "Midnight Place"</h1>
            <p>A network for all night coding lovers inspired by "Hotline Miami", "GTA Vice City" and the neon madness
                of real
                Miami</p>
            <hr/>
        </div>
        <div className={styles.mainContent}>
            <p>This project is designed to demonstrate my professional frontend development skills to a potential
                employer. But who knows, maybe as my programming skills growing up, this project will transform into
                something more
                than a presentation. At least I really hope so...</p>
            <p>Dear Potential Employer! If you are reading these lines, then you must be interested in what technologies
                and concepts
                were used in this project.
                <NavLink className={styles.link} to={'/UsedTechnologies'}> Click here, to see </NavLink>
            </p>
            <div className={styles.credits}>
                <NavLink className={styles.link} to={'/Credits'}> About the author and thanks </NavLink>
            </div>
        </div>

        <div className={styles.conclusion}>
            <hr/>
            <p>Hope you enjoy this place</p>
            <p>Lets'go! For glory of coding</p>
            <hr/>
        </div>
    </div>
}
export default WelcomePage