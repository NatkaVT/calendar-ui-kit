import React from 'react';
import Modal from '../../../ui-kit/Modal';
import Button from '../../../ui-kit/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faT, faCalendarDays, faBarsStaggered, faSquare } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import './EventInfoModal.css';

const EventInfoModal = ({ isOpen, onClose, event, onEdit, onDelete }) => {
  if (!isOpen || !event) return null;

  const formatDateRange = () => {
    if (!event.date || !event.startTime || !event.endTime) {
      return 'N/A';
    }
    const dateObj = new Date(event.date);
    if (isNaN(dateObj.getTime())) {
      return 'N/A';
    }
    const optionsDate = { weekday: 'long', month: 'long', day: 'numeric' };
    const formattedDate = dateObj.toLocaleDateString('en-US', optionsDate);
    
    let timeDisplay;
    if (event.startTime === event.endTime) {
      timeDisplay = event.startTime;
    } else {
      timeDisplay = `${event.startTime} - ${event.endTime}`;
    }
    
    return `${formattedDate}, ${timeDisplay}`;
  };

  const getWeekday = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString("en-US", { weekday: 'long' });
  };

  const getMonthDay = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString("en-US", { month: 'long', day: 'numeric' });
  };

  const getRepeatDisplayText = () => {
    if (!event.repeat || !event.repeat.type || event.repeat.type === 'Does not repeat') {
      return 'Does not repeat';
    }

    const isAllDay = !event.startTime || !event.endTime;
    const allDayPrefix = isAllDay ? 'All day, ' : '';

    switch (event.repeat.type) {
      case 'Weekly on':
        return `${allDayPrefix}Weekly on ${getWeekday(event.date)}`;
      case 'Annually on':
        return `${allDayPrefix}Annually on ${getMonthDay(event.date)}`;
      default:
        return `${allDayPrefix}${event.repeat.type}`;
    }
  };

  return (
    <Modal
      title={
        <div className="modal-title-with-actions">
          <span>Event information</span>
          <div className="event-actions">
            <Button variant="icon" onClick={onEdit} aria-label="Edit event">
              <FontAwesomeIcon icon={faPen} />
            </Button>
            <Button variant="icon" onClick={onDelete} aria-label="Delete event">
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </div>
        </div>
      }
      isOpen={isOpen}
      onClose={onClose}
      className="event-info-modal-overlay"
    >
      <div className="event-info-content">
        <div className="event-info-header">
          <FontAwesomeIcon icon={faT} size='sm' color='#5B5F6E'/>
          <h4 className="event-title">{event.title}</h4>
        </div>
        <div className="event-info-details">
          <div className="event-info-row">
            <FontAwesomeIcon icon={faClock} size='sm' color='#5B5F6E'/>
            <div className='event-info-row-date-time'>
              <span>{formatDateRange()}</span>
              <div className='event-info-row-all-repeat-day'>
                {event.allDay && (
                  <span>All day, </span>
                )}
                {event.repeat && event.repeat.type && event.repeat.type !== 'Does not repeat' && (
                  <span>{getRepeatDisplayText()}</span>
                )}
              </div>
            </div>
          </div>
          <div className="event-info-row">
            <FontAwesomeIcon icon={faCalendarDays} size='sm' color='#5B5F6E'/>
            <span style={{display:'flex', alignItems:'center', gap:'8px'}}>
              <FontAwesomeIcon icon={faSquare} color={event.calendarColor} size="sm" />
              {event.calendarName || 'N/A'}
              </span>
          </div>
          <div className="event-info-row description">
            <FontAwesomeIcon icon={faBarsStaggered} size='sm' color='#5B5F6E'/>
            <span>{event.description || 'No description'}</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EventInfoModal;
