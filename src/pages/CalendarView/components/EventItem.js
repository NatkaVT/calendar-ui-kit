import React from 'react';
import './EventItem.css';

const EventItem = ({ event, calendar, style, onClick }) => {
  const color = event.color || (calendar ? calendar.color : '#4254AF');

  const formatTimeDisplay = () => {
    if (!event.startTime || !event.endTime) {
      return event.startTime || event.endTime || '';
    }
    
    if (event.startTime === event.endTime) {
      return event.startTime;
    }
    
    return `${event.startTime} - ${event.endTime}`;
  };

  return (
    <div 
      className="event-item" 
      style={{ 
        backgroundColor: color + '80',
        position: 'relative',
        ...style 
      }} 
      onClick={onClick}
    >
      <div 
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '3px',
          backgroundColor: color,
        }}
      />
      <div className="event-title">{event.title}</div>
      <div className="event-time">{formatTimeDisplay()}</div>
    </div>
  );
};

export default EventItem;
