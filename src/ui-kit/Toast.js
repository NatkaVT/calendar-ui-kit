import React from "react";
import styles from './Toast.module.css';

const Toast = ({message, isVisible, onClose}) => {
    if (!isVisible) return null;

    return (
        <div className={styles.toast}>
            <p>{message}</p>
            <button onClick={onClose}>X</button>
        </div>
    )
}

export default Toast;