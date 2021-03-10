import React from 'react';
import loadingCircle from '../../Assets/Images/loadingCircle.gif';
import styles from './LoadingCircle.module.css'
//Демонстрирует пользователю процесс загрузки
const LoadingCircle = () => {
    return <div className={styles.loadingCircleContainer}>
        <img className={styles.loadingCircle} src={loadingCircle} alt={'Loading now'}/>
    </div>
}

export default LoadingCircle;
