import React from "react";
import styles from './Modal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, title, children, className }) => {
    if (!isOpen) return null;

    return (
        <div className={`${styles.modal} ${className || ''}`}>
            <div className={styles.modalTitle}>
                <h2>{title}</h2>
                <FontAwesomeIcon icon={faX} size="xs" onClick={onClose} />
            </div>
            <div className={styles.modalContent}>
                {children}
            </div>
        </div>
    );
};

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

export default Modal;
