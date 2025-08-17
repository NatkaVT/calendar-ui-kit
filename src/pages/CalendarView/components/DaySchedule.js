import React from 'react';
import EventItem from './EventItem';
import CurrentTimeIndicator from './CurrentTimeIndicator';
import './DaySchedule.css';

const hours = Array.from({ length: 24 }, (_, i) => i);

const formatHour = (hour) => {
  if (hour === 0) return '12 am';
  if (hour === 12) return '12 pm';
  if (hour > 12) return `${hour - 12} pm`;
  return `${hour} am`;
};

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const DaySchedule = ({ date, events, calendars, onEventClick }) => {
  const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
  const dayNumber = date.getDate();

  const dayEvents = events.filter(event => event.date === formatDate(date));



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

  const timeGroups = groupEventsByTime(dayEvents);

  return (
    <div className="day-schedule">
      <div className="day-header">
        <div className={`date-info ${isToday() ? 'current-day' : ''}`}>
          <div className="day-number">{dayNumber}</div>
          <div className="day-name">{dayName}</div>
        </div>
        <div className="day-events-summary">
          {dayEvents.length > 0 && (
            <div className="events-list">
              {dayEvents.slice(0, 3).map(event => {
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
              {dayEvents.length > 3 && (
                <div className="more-events" style={{ fontSize: '9px', color: '#666', marginTop: '2px' }}>
                  +{dayEvents.length - 3} more
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="day-content">
        <div className="time-axis">
          {hours.map(hour => (
            <div key={`time-${hour}`} className="time-label">
              {formatHour(hour)}
            </div>
          ))}
        </div>
        
        <div className="schedule-grid">
          <CurrentTimeIndicator isToday={isToday()} />
          {hours.map(hour => (
            <div key={`slot-${hour}`} className="hour-slot" />
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
    </div>
  );
};

export default DaySchedule;
