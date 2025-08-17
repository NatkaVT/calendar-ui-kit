import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import TextArea from '../../../ui-kit/TextArea'
import DatePicker from '../../../ui-kit/DatePicker';
import SelectMenu from '../../../ui-kit/SelectMenu';
import Modal from '../../../ui-kit/Modal';
import Checkbox from '../../../ui-kit/Checkbox';
import Button from '../../../ui-kit/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import './EventModal.css';
import Inputs from '../../../ui-kit/Inputs';
import { faT, faClock, faCalendarDays, faBarsStaggered } from '@fortawesome/free-solid-svg-icons';

const EventModal = ({ isOpen, onClose, onSave, event }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');
  const calendars = useSelector(state => state.calendars.calendars);
  const [selectedCalendarId, setSelectedCalendarId] = useState(calendars.length > 0 ? calendars[0].id : null);
  const [color, setColor] = useState(calendars.length > 0 ? calendars[0].color : '');

  const [errors, setErrors] = useState({});


  const [allDay, setAllDay] = useState(false);
  const [repeatType, setRepeatType] = useState('Does not repeat');

  useEffect(() => {
    if (event) {
      setTitle(event.title || '');
      if (event.date) {
        const eventDate = new Date(event.date);
        setDate(eventDate);
        setInputValue(eventDate.toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric' }));
      } else {
        setDate(null);
        setInputValue('');
      }
      setStartTime(event.startTime || '');
      setEndTime(event.endTime || '');
      setDescription(event.description || '');
      setSelectedCalendarId(event.calendarId || (calendars.length > 0 ? calendars[0].id : null));
      const calendar = calendars.find(cal => cal.id === event.calendarId);
      setColor(calendar ? calendar.color : (calendars.length > 0 ? calendars[0].color : '#000000'));
      if (event.repeat) {
        setRepeatType(event.repeat.type || 'Does not repeat');
      } else {
        setRepeatType('Does not repeat');
      }
      setAllDay(event.allDay || false);
    } else {
      setTitle('');
      setDate(null);
      setInputValue('');
      setStartTime('');
      setEndTime('');
      setDescription('');
      setSelectedCalendarId(calendars.length > 0 ? calendars[0].id : null);
      setColor(calendars.length > 0 ? calendars[0].color : '');
      setAllDay(false);
      setRepeatType('Does not repeat');
    }
  }, [event, calendars]);

  useEffect(() => {
    if (!isOpen) {
      setErrors({});
    }
  }, [isOpen]);

  const getWeekday = (date) => {
    if (!date) return '';
    return date.toLocaleDateString("en-US", { weekday: 'long' });
  };

  const getMonthDay = (date) => {
    if (!date) return '';
    return date.toLocaleDateString("en-US", { month: 'long', day: 'numeric' });
  };

  const handleSave = () => {
    const newErrors = {};
    if (!title) newErrors.title = 'Title is required';
    if (!date) newErrors.date = 'Date is required';
    if (!startTime) newErrors.startTime = 'Start time is required';
    if (!endTime) newErrors.endTime = 'End time is required';
    if (startTime && endTime && startTime > endTime) newErrors.endTime = 'End time must be after or equal to start time';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const repeatInfo = repeatType !== 'Does not repeat' ? {
      type: repeatType,
    } : null;

    const formatLocalDate = (date) => {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    onSave({ title, date: formatLocalDate(date), startTime, endTime, description, color, calendarId: selectedCalendarId, repeat: repeatInfo, allDay });
    setTitle('');
    setDate(null);
    setIsDatePickerOpen(false);
    setStartTime('');
    setEndTime('');
    setDescription('');
    setColor(calendars.length > 0 ? calendars[0].color : '#000000');
    setSelectedCalendarId(calendars.length > 0 ? calendars[0].id : null);
    setAllDay(false);
    setRepeatType('Does not repeat');
  };

  if (!isOpen) return null;

  const handleDateInputClick = () => {
    setIsDatePickerOpen(true);
  };

  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
    setInputValue(selectedDate.toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric' }));
    setIsDatePickerOpen(false);
  };

  return (
    <Modal
      title={event ? 'Edit Event' : 'Create Event'}
      isOpen={isOpen}
      onClose={onClose}
      className="modal-overlay"
    >
      <div className='modal-content'>
        <div className='event-modal-content'>
          <FontAwesomeIcon icon={faT} size='sm' color='#5B5F6E'/>
          <Inputs
            label='Title'
            type='text'
            value={title}
            onChange={e => {
              setTitle(e.target.value);
              setErrors(prev => ({ ...prev, title: false }));
            }}
            placeholder='Enter title'
            className='event-input'
            error={errors.title ? true : false}
          />
        </div>
        
        <div className='data-time-area'>
          <div className='data-area'>
            <FontAwesomeIcon icon={faClock} size='sm' color='#5B5F6E'/>
            <div className='data-area-content'>
              <Inputs
                label='Data'
                type="text"
                className="date-input"
                onClick={handleDateInputClick}
                onChange={e => {
                  const newValue = e.target.value;
                  setInputValue(newValue);
                  setErrors(prev => ({ ...prev, date: false }));
                }}
                value={inputValue}
                placeholder="Select date"
                error={errors.date ? true : false}
              />
              {isDatePickerOpen && (
                <DatePicker
                  initialDate={date}
                  onDateChange={handleDateSelect}
                />
              )}
            </div>
            
          </div>
          <div className='time-area'>
            <SelectMenu 
              label='Time' 
              value={startTime} 
              onChange={setStartTime} 
              error={errors.startTime ? true : false} 
              style={{width: '70px'}}
            />
            <span>-</span>
            <SelectMenu 
              label='Time' 
              value={endTime} 
              onChange={setEndTime} 
              error={errors.endTime ? true : false} 
              style={{width: '70px'}}
            />
          </div>
        </div>
        <div className='repeat-area'>
          <Checkbox 
            label='All day' 
            checked={allDay} 
            onChange={e => setAllDay(e.target.checked)} 
          />
          <SelectMenu
            className='repeat-select'
            value={repeatType}
            onChange={setRepeatType}
            options={[
              { value: 'Does not repeat', label: 'Does not repeat' },
              { value: 'Daily', label: 'Daily' },
              { value: 'Weekly on', label: `Weekly on ${getWeekday(date)}` },
              { value: 'Monthly', label: 'Monthly' },
              { value: 'Annually on', label: `Annually on ${getMonthDay(date)}` },
            ]}
            style={ {width: '150px'} }
          />
        </div>
        <div className='calendar-select-area'>
          <FontAwesomeIcon icon={faCalendarDays} size='sm' color='#5B5F6E'/>
          <SelectMenu
            label='Calendar'
            id='calendar-select'
            value={selectedCalendarId}
            onChange={selectedId => {
              setSelectedCalendarId(selectedId);
              const selectedCal = calendars.find(cal => cal.id === selectedId);
              if (selectedCal) {
                setColor(selectedCal.color);
              }
            }}
            options={calendars.map(cal => ({
              value: cal.id,
              label: (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FontAwesomeIcon icon={faSquare} color={cal.color} size="sm" />
                  <span>{cal.name}</span>
                </div>
              )
            }))}
            style={{ width: '300px' }}
          />
        </div>
        <div className='description-area'>
          <FontAwesomeIcon icon={faBarsStaggered} size='sm' color='#5B5F6E'/>
          <TextArea className='text-area-event' value={description} onChange={value => setDescription(value)} />
        </div>
        <div className='save-event-btn'>
          <Button onClick={handleSave} variant='primary'>Save</Button>
        </div>
      </div>
    </Modal>
  );
};

export default EventModal;

