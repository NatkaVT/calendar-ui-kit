import React from "react";
import styles from './Link.module.css';

const Link = ({ href, children, disabled, hover = false, pressed = false }) => {
    return (
        <a href={href} className={`${styles.link} ${disabled ? styles.disabled : ''} ${hover ? styles.hover : ''} ${pressed ? styles.pressed : ''}`}
        onClick={disabled ? (e) => e.preventDefault() : undefined}>
            {children}
        </a>
    );
};

export default Link;
