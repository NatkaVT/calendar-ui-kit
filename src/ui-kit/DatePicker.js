import React, { useState } from "react";
import { DayPicker } from 'react-day-picker';
import "react-day-picker/style.css";
import styles from './DatePicker.module.css';
import PropTypes from 'prop-types';

const DatePickerEl = ({ initialDate, onDateChange, className }) => {
    const [startDate, setStartDate] = useState(initialDate || new Date());

    const handleDateChange = (date) => {
        console.log("Selected date:", date);
        setStartDate(date);
        if (onDateChange) {
            onDateChange(date);
        }
    };

    return (
        <div className={`${styles.datePicker} ${className || ''}`}>
            <DayPicker
                className={styles.calendar}
                mode="single"
                showOutsideDays
                selected={startDate}
                onDayClick={handleDateChange}
                modifiersClassNames={{
                    selected: styles.daySelected,
                    today: styles.today,
                }}
            />

        </div>
    );
};

DatePickerEl.propTypes = {
    initialDate: PropTypes.instanceOf(Date),
    onDateChange: PropTypes.func,
    dateFormat: PropTypes.string,
    isClearable: PropTypes.bool,
    placeholderText: PropTypes.string,
    customStyles: PropTypes.string,
};

export default DatePickerEl;
