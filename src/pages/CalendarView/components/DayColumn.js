import React, { useRef } from 'react';
import EventItem from './EventItem';
import CurrentTimeIndicator from './CurrentTimeIndicator';
import './DayColumn.css';

const hours = Array.from({ length: 24 }, (_, i) => i);

const DayColumn = ({ date, events, calendars, onEventClick, sharedHeaderHeight }) => {
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

  const groupEventsByTime = (events) => {
    const timeGroups = {};
    
    events.forEach(event => {
      const startMinutes = parseTimeToMinutes(event.startTime);
      const timeKey = `${startMinutes}`;
      
      if (!timeGroups[timeKey]) {
        timeGroups[timeKey] = [];
      }
      timeGroups[timeKey].push(event);
    });
    
    return timeGroups;
  };

  const timeGroups = groupEventsByTime(events);

  return (
    <div className="day-column">
      <div 
        className='day-header'
        style={{
          height: `${sharedHeaderHeight}px`,
          minHeight: `${sharedHeaderHeight}px`
        }}
      >
        <div className={`data-info ${isToday() ? 'current-day' : ''}`}>
          <div className="day-number">{dayNumber}</div>
          <div className="day-name">{dayName}</div>
        </div> 
        <div className="day-events-summary">
          {events.length > 0 && (
            <div className="events-list">
              {events.slice(0, 3).map(event => {
                const calendar = calendars.find(cal => cal.id === event.calendarId);
                const color = event.color || (calendar ? calendar.color : '#4254AF');
                
                return (
                  <div 
                    key={event.id} 
                    className="day-event-item"
                    style={{
                      backgroundColor: color + "80",
                      color: 'white',
                      cursor: 'pointer',
                      borderLeft: `3px solid ${color}`
                    }}
                    onClick={() => onEventClick(event)}
                    title={event.title}
                  >
                    {event.title}
                  </div>
                );
              })}
              {events.length > 3 && (
                <div className="more-events" style={{ fontSize: '9px', color: '#666', marginTop: '2px' }}>
                  +{events.length - 3} more
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="hours-column" ref={containerRef} style={{ position: 'relative' }}>
        <CurrentTimeIndicator isToday={isToday()} />
        {hours.map(hour => (
          <div key={hour} className="hour-cell" />
        ))}
        {Object.entries(timeGroups).map(([timeKey, timeEvents]) => {
          const startMinutes = parseInt(timeKey, 10);
          const totalEvents = timeEvents.length;
          
          return timeEvents.map((event, index) => {
            const endMinutes = parseTimeToMinutes(event.endTime);
            const top = startMinutes * pixelsPerMinute;
            const duration = endMinutes - startMinutes;
            const height = duration === 0 ? 20 : duration * pixelsPerMinute;
            
            const eventWidth = 100 / totalEvents;
            const leftOffset = (eventWidth * index);
            const rightOffset = 100 - (eventWidth * (index + 1));
            
            const style = {
              position: 'absolute',
              top: `${top}px`,
              height: `${height}px`,
              left: `${leftOffset}%`,
              right: `${rightOffset}%`,
              zIndex: index + 1,
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
          });
        })}
      </div>
    </div>
  );
};

export default DayColumn;
