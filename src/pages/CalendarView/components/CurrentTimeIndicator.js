import React, { useState, useEffect } from 'react';
import './CurrentTimeIndicator.css';

const CurrentTimeIndicator = ({ isToday }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isToday) {
      setIsVisible(false);
      return;
    }

    setIsVisible(true);

    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    setCurrentTime(new Date());

    return () => clearInterval(interval);
  }, [isToday]);

  if (!isVisible) return null;

  const now = currentTime;
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const totalMinutes = hours * 60 + minutes;
  
  const pixelsPerMinute = 80 / 60;
  const topPosition = totalMinutes * pixelsPerMinute;

  return (
    <div 
      className="current-time-indicator"
      style={{ top: `${topPosition}px` }}
    >
      <div className="time-line"></div>
    </div>
  );
};

export default CurrentTimeIndicator;
