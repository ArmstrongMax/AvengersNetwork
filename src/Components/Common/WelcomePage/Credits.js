import React from "react";
import styles from './Credits.module.css'
//Об авторе и благодарности
let Credits = () => {
    return <div className={styles.credits}>
        <h1>Credits</h1>
        <div className={styles.main}>
            <p>Frontend by Maksim Mikhaylov. Find me in this network by id: 14338 / name: "Maksim Mikhaylov". Also check
                my
                contacts in other networks </p>
            <p> Backend and API by Dmitry Kuzyuberdin </p>

            <p>This project is the result of the course "React way of samurai 1.0" by Dmitry Kuzyuberdin and his YouTube
                channel "IT-Kamasutra". His professionalism and altruism have helped me and thousands of other people to
                fulfill the dream of entering the world of programming</p>
        </div>


        <div className={styles.links}>
            <p>Links</p>
            <ul>
                <li><a href="https://vk.com/id17768111">Maksim Mikhaylov</a></li>
                <li><a href="https://vk.com/d.kuzyuberdin">Dmitry Kuzyuberdin</a></li>
                <li><a href="https://www.youtube.com/c/ITKAMASUTRA">YouTube channel</a></li>
                <li><a href="https://social-network.samuraijs.com/docs">API</a></li>
            </ul>
        </div>
    </div>
}
export default Credits