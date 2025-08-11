import React from 'react';
import DayColumn from './DayColumn';
import HourLabel from './HourLabel';
import './WeekView.css';

const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const WeekView = ({ events, calendars, currentWeekStart, onEventClick }) => {
  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    weekDates.push(addDays(currentWeekStart, i));
  }

  return (
    <div className="week-view">
      <div className="week-grid">
        <div className="scroll-container">
          <HourLabel />
          {weekDates.map(date => (
            <DayColumn
              key={date.toISOString()}
              date={date}
              events={events.filter(event => event.date === date.toISOString().slice(0,10))}
              calendars={calendars}
              onEventClick={onEventClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeekView;
