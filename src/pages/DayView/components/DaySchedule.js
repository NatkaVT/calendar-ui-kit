import React from 'react';
import EventItem from './EventItem';
import './DaySchedule.css';

const hours = Array.from({ length: 24 }, (_, i) => i);

const DaySchedule = ({ date, events, calendars }) => {
  const dayEvents = events.filter(event => event.date === date.toISOString().slice(0, 10));
  const visibleCalendarIds = calendars.filter(cal => cal.visible).map(cal => cal.id);

  return (
    <div className="day-schedule">
      <div className="day-header">
        <h2>{date.toLocaleDateString("en-US", { day: 'numeric', weekday: 'short'})}</h2>
      </div>
      <div className="hours-column">
        {hours.map(hour => (
          <div key={hour} className="hour-cell">
            {dayEvents
              .filter(event => {
                const eventHour = parseInt(event.startTime.split(':')[0], 10);
                return eventHour === hour && visibleCalendarIds.includes(event.calendarId);
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

export default DaySchedule;
