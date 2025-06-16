import React, { useState, useRef } from 'react';
import styles from './SelectMenu.module.css';
import PropTypes from 'prop-types';

const SelectMenu = ({ onChange, value, options, isOpen: initialIsOpen, label, style }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(initialIsOpen || false);

    const defaultOptions = [];

    // If options prop is not provided, fallback to default hours array
    if (!options) {
        for (let hour = 12; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 15) {
                const formattedHour = hour < 10 ? `0${hour}` : hour;
                const formattedMinute = minute < 10 ? '0' : '';
                const ampm = hour < 12 ? 'am' : 'pm';
                defaultOptions.push(`${formattedHour}:${formattedMinute}${minute} ${ampm}`);
            }
        }

        for (let hour = 0; hour < 12; hour++) {
            for (let minute = 0; minute < 60; minute += 15) {
                const formattedHour = hour < 10 ? `0${hour}` : hour;
                const formattedMinute = minute < 10 ? '0' : '';
                defaultOptions.push(`${formattedHour}:${formattedMinute}${minute} am`);
            }
        }
    }

    const [selected, setSelected] = useState(value || null);
    const selectRef = useRef();

    const handleSelectClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleOptionClick = (option) => {
        setSelected(option.value !== undefined ? option.value : option);
        setIsMenuOpen(false);
        if (onChange) {
            onChange(option.value !== undefined ? option.value : option);
        }
    };

    const displayLabel = () => {
        if (selected === null) {
            return defaultOptions[2] || '';
        }
        if (options) {
            const selectedOption = options.find(opt => opt.value === selected);
            return selectedOption ? selectedOption.label : selected;
        }
        return selected;
    };

    return (
        <div className={styles.selectMenu} ref={selectRef} style={style}>
            {label && <label htmlFor='time-select'>{label}</label>}
            <div className={styles.customSelect} onClick={handleSelectClick}>
                <div className={`${styles.selectedValue} ${styles.hover}`}>
                    {displayLabel()}
                </div>
                {isMenuOpen && (
                    <div className={styles.options}>
                        {(options || defaultOptions).map((option, index) => {
                            const key = option.value !== undefined ? option.value : option;
                            const label = option.label !== undefined ? option.label : option;
                            const isActive = selected === key;
                            return (
                                <div
                                    key={key}
                                    className={`${styles.option} ${isActive ? styles.active : ''} ${index === 2 ? styles.hover : ''}`}
                                    onClick={() => handleOptionClick(option)}
                                >
                                    {label}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

SelectMenu.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    isOpen: PropTypes.bool,
    label: PropTypes.string,
    style: PropTypes.object,
};

export default SelectMenu;
