import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './ColorPicker.module.css';

const ColorPicker = ({ colors, onColorSelect, selected }) => {
    const [selectedColor, setSelectedColor] = useState(selected || null);

    useEffect(() => {
        setSelectedColor(selected);
    }, [selected]);

    const handleColorSelect = (color) => {
        setSelectedColor(color);
        if (onColorSelect) {
            onColorSelect(color);
        }
    };

    return (
        <div className={styles.colorPicker}>
            <h4>Colours</h4>
            <div className={styles.colorGrid}>
                {colors.map(color => (
                    <div className={`${styles.colorBoxWrapper} ${selectedColor === color ? styles.selected : ''}`} key={color}>
                        <div
                            className={styles.colorBox}
                            style={{ backgroundColor: color }}
                            onClick={() => handleColorSelect(color)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

ColorPicker.propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    onColorSelect: PropTypes.func,
    selected: PropTypes.string,
};

export default ColorPicker;
