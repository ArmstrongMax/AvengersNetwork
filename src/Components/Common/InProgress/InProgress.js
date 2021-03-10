import workingHard from '../../Assets/Images/inProgress.gif'
import React from 'react'
import styles from './InProgress.module.css'
//Заглушка разделов в разработке
let InProgress = () => {
    return <div>
        <div className={styles.h1}>
            <h1>In progress</h1>
            <hr/>
        </div>
        <div className={styles.text}>
            <p>Hey visitor!</p>
            <p> This amazing feature in the process. I am studying React and related technologies hard. And as I
                improve, the project will grow.</p>
            <p>Stay tuned!</p>
        </div>
        <div className={styles.gif}>
            <img src={workingHard} alt={'On my way'}/>
        </div>
    </div>
}
export default InProgress