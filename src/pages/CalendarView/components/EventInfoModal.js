import React from 'react';
import Modal from '../../../ui-kit/Modal';
import Button from '../../../ui-kit/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';
import './EventInfoModal.css';

const EventInfoModal = ({ isOpen, onClose, event, onEdit, onDelete }) => {
  if (!isOpen || !event) return null;

  const formatDateRange = () => {
    const startDate = new Date(event.date + 'T' + event.startTime);
    const endDate = new Date(event.date + 'T' + event.endTime);
    const optionsDate = { weekday: 'long', month: 'long', day: 'numeric' };
    const optionsTime = { hour: '2-digit', minute: '2-digit' };
    const dateStr = startDate.toLocaleDateString('en-US', optionsDate);
    const startTimeStr = startDate.toLocaleTimeString('en-US', optionsTime);
    const endTimeStr = endDate.toLocaleTimeString('en-US', optionsTime);
    return `${dateStr}, ${startTimeStr} - ${endTimeStr}`;
  };

  return (
    <Modal
      title="Event information"
      isOpen={isOpen}
      onClose={onClose}
      className="event-info-modal-overlay"
    >
      <div className="event-info-content">
        <button className="close-btn" onClick={onClose} aria-label="Close">
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="event-info-header">
          <h2 className="event-title">{event.title}</h2>
          <div className="event-actions">
            <Button variant="icon" onClick={onEdit} aria-label="Edit event">
              <FontAwesomeIcon icon={faPen} />
            </Button>
            <Button variant="icon" onClick={onDelete} aria-label="Delete event">
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </div>
        </div>
        <div className="event-info-details">
          <div className="event-info-row">
            <FontAwesomeIcon icon={faTimes} style={{ visibility: 'hidden' }} />
            <span>{formatDateRange()}</span>
          </div>
          {event.repeat && event.repeat.type && (
            <div className="event-info-row">
              <span>All day, {event.repeat.type}</span>
            </div>
          )}
          <div className="event-info-row">
            <span>Calendar: {event.calendarName || 'N/A'}</span>
          </div>
          <div className="event-info-row description">
            <span>{event.description || 'No description'}</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EventInfoModal;
