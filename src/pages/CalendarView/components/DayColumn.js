import React, { useRef } from 'react';
import EventItem from './EventItem';
import './DayColumn.css';

const hours = Array.from({ length: 24 }, (_, i) => i);

const DayColumn = ({ date, events, calendars, onEventClick }) => {
  const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
  const dayNumber = date.getDate();

  const isToday = () => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const parseTimeToMinutes = (timeStr) => {
    const timeRegex = /^(\d{1,2}):(\d{2})\s?(am|pm)?$/i;
    const match = timeStr.match(timeRegex);
    if (!match) {
      return 0;
    }
    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    const meridiem = match[3] ? match[3].toLowerCase() : null;

    if (meridiem === 'pm' && hours !== 12) {
      hours += 12;
    } else if (meridiem === 'am' && hours === 12) {
      hours = 0;
    }
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
            height:`${height}px`,
            left: '2px',
            right: '2px',
          };
          return (
            <EventItem
              key={event.id}
              event={event}
              calendar={calendars.find(cal => cal.id === event.calendarId)}
              style={style}
              onClick={() => onEventClick(event)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default DayColumn;
