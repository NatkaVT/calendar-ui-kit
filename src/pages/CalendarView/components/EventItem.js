import React from 'react';
import './EventItem.css';

const EventItem = ({ event, calendar, style, onClick }) => {
  const color = event.color || (calendar ? calendar.color : '#999');

  return (
    <div className="event-item" style={{ backgroundColor: color, ...style }} onClick={onClick}>
      <div className="event-title">{event.title}</div>
      <div className="event-time">{event.startTime} - {event.endTime}</div>
    </div>
  );
};

export default EventItem;
