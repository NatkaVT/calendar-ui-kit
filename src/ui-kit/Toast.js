import React from "react";
import styles from './Toast.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

const Toast = ({message, isVisible, onClose}) => {
    if (!isVisible) return null;

    return (
        <div className={styles.toast}>
            <p>{message}</p>
            <button onClick={onClose}>
                <FontAwesomeIcon icon={faX} size='sm' />
            </button>
        </div>
    )
}

export default Toast;