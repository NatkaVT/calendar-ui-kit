import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEventsForDateRange } from '../../utils/eventRepetition';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash} from '@fortawesome/free-solid-svg-icons';
import { addCalendar, editCalendar, deleteCalendar, toggleCalendarVisibility } from '../../entities/calendars/calendarsSlice';
import { addEvent, editEvent, deleteEvent } from '../../entities/events/eventsSlice';
import DatePicker from '../../ui-kit/DatePicker';
import Button from '../../ui-kit/Button';
import Checkbox from '../../ui-kit/Checkbox';
import Dropdown from '../../ui-kit/Dropdown';
import Toast from '../../ui-kit/Toast';
import WeekView from './components/WeekView';
import DaySchedule from './components/DaySchedule';
import EventModal from './components/EventModal';
import EventInfoModal from './components/EventInfoModal';
import CalendarModal from './components/CalendarModal';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import logo from './logo.png';
import './CalendarView.css';

const DayView = () => {
  const dispatch = useDispatch();
  const calendars = useSelector((state) => state.calendars.calendars);
  const events = useSelector((state) => state.events.events);

  const [viewMode, setViewMode] = useState('Week');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentWeekStart, setCurrentWeekStart] = useState(getStartOfWeek(new Date()));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const [editingCalendar, setEditingCalendar] = useState(null);
  const [deletingCalendar, setDeletingCalendar] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isToastVisible, setIsToastVisible] = useState(false);

  function getStartOfWeek(date) {
    const day = date.getDay();
    const diff = date.getDate() - day;
    return new Date(date.setDate(diff));
  }

  const handleToday = () => {
    if (viewMode === 'Week') {
      setCurrentWeekStart(getStartOfWeek(new Date()));
    } else {
      setCurrentDate(new Date());
    }
  };

  const handlePrev = () => {
    if (viewMode === 'Week') {
      setCurrentWeekStart(prev => {
        const newDate = new Date(prev);
        newDate.setDate(newDate.getDate() - 7);
        return newDate;
      });
    } else {
      setCurrentDate(prev => {
        const newDate = new Date(prev);
        newDate.setDate(newDate.getDate() - 1);
        return newDate;
      });
    }
  };

  const handleNext = () => {
    if (viewMode === 'Week') {
      setCurrentWeekStart(prev => {
        const newDate = new Date(prev);
        newDate.setDate(newDate.getDate() + 7);
        return newDate;
      });
    } else {
      setCurrentDate(prev => {
        const newDate = new Date(prev);
        newDate.setDate(newDate.getDate() + 1);
        return newDate;
      });
    }
  };

  const handleViewChange = (option) => {
    setViewMode(option);
  };

  const handleCreateClick = () => {
    setSelectedEvent(null);
    setIsModalOpen(true);
  };

  const handleInfoModalClose = () => {
    setIsInfoModalOpen(false);
    setSelectedEvent(null);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  React.useEffect(() => {
    if (!isModalOpen) {
      setSelectedEvent(null);
    }
  }, [isModalOpen]);

  const handleSaveEvent = (eventData) => {
    if (selectedEvent) {
      dispatch(editEvent({
        id: selectedEvent.id,
        updates: {
          title: eventData.title,
          date: eventData.date,
          startTime: eventData.startTime,
          endTime: eventData.endTime,
          description: eventData.description,
          color: eventData.color,
          calendarId: eventData.calendarId || (calendars.length > 0 ? calendars[0].id : null),
        }
      }));
    } else {
      dispatch(addEvent({
        id: Date.now().toString(),
        title: eventData.title,
        date: eventData.date,
        startTime: eventData.startTime,
        endTime: eventData.endTime,
        description: eventData.description,
        color: eventData.color,
        calendarId: eventData.calendarId || (calendars.length > 0 ? calendars[0].id : null),
      }));
    }
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleEventClick = (event) => {
    const calendar = calendars.find(cal => cal.id === event.calendarId);
    
    const enrichedEvent = {
      ...event,
      calendarName: calendar ? calendar.name : 'N/A',
      calendarColor: calendar ? calendar.color : '#000000',
      date: event.date || '',
      startTime: event.startTime || '',
      endTime: event.endTime || '',
      calendarId: event.calendarId,
      color: calendar ? calendar.color : '#4254AF',
      repeat: event.repeat || null,
    };
    setSelectedEvent(enrichedEvent);
    setIsInfoModalOpen(true);
  };

  const handleEditClick = () => {
    setIsInfoModalOpen(false);
    setSelectedEvent(selectedEvent);
    setIsModalOpen(true);
  };

  const handleDeleteClick = () => {
    setIsInfoModalOpen(false);
    setDeletingCalendar(null);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedEvent) {
      dispatch(deleteEvent(selectedEvent.id));
    }
    if (deletingCalendar) {
      dispatch(deleteCalendar(deletingCalendar.id));
    }
    setIsDeleteModalOpen(false);
    setSelectedEvent(null);
    setDeletingCalendar(null);
  };

  const handleCalendarCreateClick = () => {
    setEditingCalendar(null);
    setIsCalendarModalOpen(true);
  };

  const handleCalendarModalClose = () => {
    setIsCalendarModalOpen(false);
    setEditingCalendar(null);
  };

  const handleSaveCalendar = (name, color) => {
    if (editingCalendar) {
      dispatch(editCalendar({ id: editingCalendar.id, name, color }));
    } else {
      dispatch(addCalendar(name, color));
    }
    setIsCalendarModalOpen(false);
    setEditingCalendar(null);
  };

  const handleEditCalendar = (calendar) => {
    setEditingCalendar(calendar);
    setIsCalendarModalOpen(true);
  };

  const handleDeleteCalendar = (calendar) => {
    setDeletingCalendar(calendar);
    setIsDeleteModalOpen(true);
  };


  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setDeletingCalendar(null);
  };

  return (
    <div className='main-calendar'>
      <header>
        <div className='header-logo'>
          <img src={logo} alt=''></img>
          <h1>WebCalendar</h1>
        </div> 
        <div className='header-btn'>
          <Button onClick={handleToday} variant="primary" className='today-btn'>Today</Button>
          <Button onClick={handlePrev} className='update-btn'>{'<'}</Button>
          <Button onClick={handleNext} className='update-btn'>{'>'}</Button>
          <h3>{currentWeekStart.toLocaleDateString("en-US", { month: 'long', year: 'numeric' })}</h3>
        </div>
        <div className='header-user-info'>
          <Dropdown options={['Day', 'Week']} defaultOption={viewMode} onChange={handleViewChange} className='switch-option' />
          <div className='user-profile'>
            <h4>Username</h4>
          </div>
        </div>
      </header>
      <div className='calendar-container'>
        <nav>
          <Button onClick={handleCreateClick} variant='primary' className='create-btn'>Create</Button>
          <DatePicker selectedDate={currentDate} onChange={setCurrentDate} className='update-datepicker'/>
          <div className='user-calendars'>
            <div className='title-user-calendars'>
              <h3>My calendars</h3>
              <button onClick={handleCalendarCreateClick}>+</button>
            </div>
            {calendars.map((calendar) => (
              <div key={calendar.id} className="calendar-item">
                <Checkbox
                  checked={calendar.visible}
                  onChange={() => dispatch(toggleCalendarVisibility(calendar.id))}
                  label={calendar.name}
                  color={calendar.color}
                  disabled={calendar.isDefault}
                />
                <div className="calendar-actions">
                  {!calendar.isDefault && (
                    <button className="delete-btn" onClick={() => handleDeleteCalendar(calendar)}>
                      <FontAwesomeIcon icon={faTrash} style={{ color: '#323749' }} />
                    </button>
                  )}
                  <button className="edit-btn" onClick={() => handleEditCalendar(calendar)}>
                    <FontAwesomeIcon icon={faPen} style={{ color: '#323749' }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </nav>
        <main>
          {viewMode === 'Week' ? (
            <WeekView
              events={getEventsForDateRange(
                events.filter(event => calendars.filter(cal => cal.visible).map(cal => cal.id).includes(event.calendarId)),
                new Date(currentWeekStart),
                new Date(new Date(currentWeekStart).setDate(new Date(currentWeekStart).getDate() + 7))
              )}
              calendars={calendars}
              currentWeekStart={currentWeekStart}
              setCurrentWeekStart={setCurrentWeekStart}
              onEventClick={handleEventClick}
            />
          ) : (
            <DaySchedule
              events={getEventsForDateRange(
                events.filter(event => calendars.filter(cal => cal.visible).map(cal => cal.id).includes(event.calendarId)),
                new Date(currentDate),
                new Date(currentDate)
              )}
              calendars={calendars}
              date={currentDate}
              setCurrentDate={setCurrentDate}
              onEventClick={(event) => {
                setSelectedEvent(event);
                setIsModalOpen(true);
              }}
            />
          )}
        </main>
        <EventModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSave={handleSaveEvent}
          event={selectedEvent}
        />
        <EventInfoModal
          isOpen={isInfoModalOpen}
          onClose={handleInfoModalClose}
          event={selectedEvent}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
        <CalendarModal
          isOpen={isCalendarModalOpen}
          onClose={handleCalendarModalClose}
          onSave={handleSaveCalendar}
          initialName={editingCalendar ? editingCalendar.name : ''}
          initialColor={editingCalendar ? editingCalendar.color : ''}
        />
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
          itemName={deletingCalendar ? deletingCalendar.name : (selectedEvent ? selectedEvent.title : '')}
          itemType={deletingCalendar ? 'calendar' : 'event'}
        />
        <Toast
          message={toastMessage}
          isVisible={isToastVisible}
          onClose={() => setIsToastVisible(false)}
        />
      </div>
    </div>
  );
};

export default DayView;
