import React from 'react';
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

  return (
    <div className="day-column">
      <div className={`day-header ${isToday() ? 'current-day' : ''}`}> 
        <div className="day-number">{dayNumber}</div>
        <div className="day-name">{dayName}</div>
      </div>
      <div className="hours-column">
        {hours.map(hour => (
          <div key={hour} className="hour-cell">
            {events
              .filter(event => {
                const eventHour = parseInt(event.startTime.split(':')[0], 10);
                return eventHour === hour;
              })
              .map(event => (
                <EventItem key={event.id} event={event} calendar={calendars.find(cal => cal.id === event.calendarId)} />
              ))
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayColumn;
