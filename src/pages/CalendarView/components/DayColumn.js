import React, { useRef } from 'react';
import EventItem from './EventItem';
import './DayColumn.css';

const hours = Array.from({ length: 24 }, (_, i) => i);

const DayColumn = ({ date, events, calendars }) => {
  const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
  const dayNumber = date.getDate();

  const isToday = () => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const parseTimeToMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const containerRef = useRef(null);
  const pixelsPerMinute = 80 / 60;

  return (
    <div className="day-column">
      <div className={`day-header ${isToday() ? 'current-day' : ''}`}> 
        <div className="day-number">{dayNumber}</div>
        <div className="day-name">{dayName}</div>
      </div>
      <div className="hours-column" ref={containerRef} style={{ position: 'relative' }}>
        {hours.map(hour => (
          <div key={hour} className="hour-cell" />
        ))}
        {events.map(event => {
          const startMinutes = parseTimeToMinutes(event.startTime);
          const endMinutes = parseTimeToMinutes(event.endTime);
          const top = startMinutes * pixelsPerMinute;
          const height = (endMinutes - startMinutes) * pixelsPerMinute;
          const style = {
            position: 'absolute',
            top: `${top}px`,
            height: `${height}px`,
            left: '2px',
            right: '2px',
          };
          return (
            <EventItem
              key={event.id}
              event={event}
              calendar={calendars.find(cal => cal.id === event.calendarId)}
              style={style}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DayColumn;
