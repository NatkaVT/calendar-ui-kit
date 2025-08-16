import React from 'react';
import DayColumn from './DayColumn';
import HourLabel from './HourLabel';
import './DaySchedule.css';

const formatDate = (date) => {
  return date.toISOString().slice(0, 10);
};

const DaySchedule = ({ date, events, calendars, onEventClick }) => {
  const dayEvents = events.filter(event => event.date === formatDate(date));

  return (
    <div className="day-schedule">
      <div className='day-grid'>
        <HourLabel />
        <DayColumn date={date} events={dayEvents} calendars={calendars} onEventClick={onEventClick} />
      </div>
    </div>
  );
};

export default DaySchedule;
