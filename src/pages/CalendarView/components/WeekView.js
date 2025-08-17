import React, { useMemo } from 'react';
import DayColumn from './DayColumn';
import HourLabel from './HourLabel';
import './WeekView.css';

const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const WeekView = ({ events, calendars, currentWeekStart, onEventClick }) => {
  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    weekDates.push(addDays(currentWeekStart, i));
  }

  const sharedHeaderHeight = useMemo(() => {
    let maxEventsCount = 0;
    
    weekDates.forEach(date => {
      const dateEvents = events.filter(event => event.date === formatDate(date));
      if (dateEvents.length > maxEventsCount) {
        maxEventsCount = dateEvents.length;
      }
    });

    if (maxEventsCount === 0) return 60; 
    
    const baseHeight = 50;
    const eventHeight = 18; 
    const eventSpacing = 2; 
    const maxEventsToShow = 3;
    const padding = 10;
    
    const eventsToShow = Math.min(maxEventsCount, maxEventsToShow);
    const eventsHeight = eventsToShow * (eventHeight + eventSpacing);
    const moreEventsHeight = maxEventsCount > maxEventsToShow ? 12 : 0; 
    
    const calculatedHeight = baseHeight + eventsHeight + moreEventsHeight + padding;
    
    return Math.max(calculatedHeight, 60);
  }, [events, weekDates]);


  return (
    <div className="week-view">
      <div className="week-grid">
        <div className="scroll-container">
          <HourLabel sharedHeaderHeight={sharedHeaderHeight} />
          {weekDates.map(date => {
            const dateEvents = events.filter(event => event.date === formatDate(date));
            
            return (
              <DayColumn
                key={date.toISOString()}
                date={date}
                events={dateEvents}
                calendars={calendars}
                onEventClick={onEventClick}
                sharedHeaderHeight={sharedHeaderHeight}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WeekView;
