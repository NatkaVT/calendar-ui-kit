import React from 'react';
import styles from './Button.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const Button = ({
  children, 
  variant, 
  onClick,
  disabled,
  icon,
  hover = false,
  pressed = false,
  className = "",
}) => {
  const combinedClassName = `${styles.button} ${styles[variant]} ${hover ? styles.hover : ''} ${pressed ? styles.pressed : ''} ${className}`;

  return (
    <button 
      className={combinedClassName} 
      onClick={onClick} 
      disabled={disabled}
    >
      {icon === 'play' && <FontAwesomeIcon icon={faPlay} />}
      {children}
    </button>
  );
};

export default Button;
