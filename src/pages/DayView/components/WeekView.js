import React from 'react';
import DayColumn from './DayColumn';
import HourLabel from './HourLabel';
import './WeekView.css';

const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const WeekView = ({ events, calendars, currentWeekStart }) => {
  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    weekDates.push(addDays(currentWeekStart, i));
  }

  const visibleCalendarIds = calendars.filter(cal => cal.visible).map(cal => cal.id);
  const eventsForWeek = events.filter(event => {
    const eventDateStr = event.date;
    const startDateStr = currentWeekStart.toISOString().slice(0, 10);
    const endDateStr = addDays(currentWeekStart, 7).toISOString().slice(0, 10);
    return eventDateStr >= startDateStr &&
           eventDateStr < endDateStr &&
           visibleCalendarIds.includes(event.calendarId);
  });

  return (
    <div className="week-view">
      <div className="week-grid">
        <HourLabel />
        {weekDates.map(date => (
          <DayColumn
            key={date.toISOString()}
            date={date}
            events={eventsForWeek.filter(event => event.date === date.toISOString().slice(0,10))}
            calendars={calendars}
          />
        ))}
      </div>
    </div>
  );
};

export default WeekView;
