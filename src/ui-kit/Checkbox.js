import React from "react";
import styles from './Checkbox.module.css';

const Checkbox = ({ checked, onChange, label, color }) => {
    return (
        <div className={styles.checkbox}>
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                style={{ accentColor: color }}
            />
            {label && <span className={styles.label}>{label}</span>}
        </div>
    );
};

export default Checkbox;
