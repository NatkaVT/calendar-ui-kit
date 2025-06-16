import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash} from '@fortawesome/free-solid-svg-icons';
import { addCalendar, editCalendar, deleteCalendar, toggleCalendarVisibility } from '../../entities/calendars/calendarsSlice';
import { addEvent } from '../../entities/events/eventsSlice';
import DatePicker from '../../ui-kit/DatePicker';
import Button from '../../ui-kit/Button';
import Checkbox from '../../ui-kit/Checkbox';
import Dropdown from '../../ui-kit/Dropdown';
import WeekView from './components/WeekView';
import DaySchedule from './components/DaySchedule';
import EventModal from './components/EventModal';
import CalendarModal from './components/CalendarModal';
import DeleteConfirmationModal from './components/DeleteConfirmationModal';
import logo from './logo.png';
import './DayView.css';

const DayView = () => {
  const dispatch = useDispatch();
  const calendars = useSelector((state) => state.calendars.calendars);
  const events = useSelector((state) => state.events.events);

  const [viewMode, setViewMode] = useState('Week'); // 'Week' or 'Day'
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentWeekStart, setCurrentWeekStart] = useState(getStartOfWeek(new Date()));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);

  const [editingCalendar, setEditingCalendar] = useState(null);
  const [deletingCalendar, setDeletingCalendar] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSaveEvent = (eventData) => {
    dispatch(addEvent({
      id: Date.now().toString(),
      title: eventData.title,
      date: eventData.date,
      startTime: eventData.startTime,
      endTime: eventData.endTime,
      description: eventData.description,
      color: eventData.color,
      calendarId: calendars.length > 0 ? calendars[0].id : null,
    }));
    setIsModalOpen(false);
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

  const handleDeleteConfirm = () => {
    if (deletingCalendar) {
      dispatch(deleteCalendar(deletingCalendar.id));
    }
    setIsDeleteModalOpen(false);
    setDeletingCalendar(null);
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
          <Dropdown options={['Day', 'Week']} defaultOption={viewMode} onChange={handleViewChange} />
          <div className='user-profile'>
            <h4>Username</h4>
          </div>
        </div>
      </header>
      <div className='calendar-container'>
        <nav>
          <Button onClick={handleCreateClick} variant='primary' className='create-btn'>Create</Button>
          <DatePicker selectedDate={currentDate} onChange={setCurrentDate} className='update-datepicker custom-datepicker'/>
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
                {!calendar.isDefault && (
                  <div className="calendar-actions">
                    <button className="delete-btn" onClick={() => handleDeleteCalendar(calendar)}>
                      <FontAwesomeIcon icon={faTrash} style={{ color: '#323749' }} />
                    </button>
                    <button className="edit-btn" onClick={() => handleEditCalendar(calendar)}>
                      <FontAwesomeIcon icon={faPen} style={{ color: '#323749' }} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>
        <main>
          {viewMode === 'Week' ? (
            <WeekView
              events={events}
              calendars={calendars}
              currentWeekStart={currentWeekStart}
              setCurrentWeekStart={setCurrentWeekStart}
            />
          ) : (
            <DaySchedule
              events={events}
              calendars={calendars}
              date={currentDate}
              setCurrentDate={setCurrentDate}
            />
          )}
        </main>
        <EventModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSave={handleSaveEvent}
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
          calendarName={deletingCalendar ? deletingCalendar.name : ''}
        />
      </div>
    </div>
  );
};

export default DayView;
