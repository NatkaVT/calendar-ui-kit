import React from 'react';
import './HourLabel.css';

const hours = Array.from({ length: 24 }, (_, i) => i);

const formatHour = (hour) => {
  const period = hour >= 12 ? 'pm' : 'am';
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12} ${period}`;
};

const HourLabel = () => {
  return (
    <div className="hour-label-column">
      <div className="hour-label-header"></div>
      {hours.map(hour => (
        <div key={hour} className="hour-label-cell">
          {formatHour(hour)}
        </div>
      ))}
    </div>
  );
};

export default HourLabel;
