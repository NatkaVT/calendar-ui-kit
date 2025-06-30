import React, { useState } from 'react';
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

const EventModal = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');
  const calendars = useSelector(state => state.calendars.calendars);
  const [selectedCalendarId, setSelectedCalendarId] = useState(calendars.length > 0 ? calendars[0].id : null);
  const [color, setColor] = useState(calendars.length > 0 ? calendars[0].color : '#000000');

  const [repeatEnabled, setRepeatEnabled] = useState(false);
  const [repeatType, setRepeatType] = useState('Does not repeat');

  const getWeekday = (date) => {
    if (!date) return '';
    return date.toLocaleDateString("en-US", { weekday: 'long' });
  };

  const getMonthDay = (date) => {
    if (!date) return '';
    return date.toLocaleDateString("en-US", { month: 'long', day: 'numeric' });
  };

  const handleSave = () => {
    if (!title || !date || !startTime || !endTime) {
      alert('Please fill in title, date, start time, and end time.');
      return;
    }
    if (startTime >= endTime) {
      alert('End time must be after start time.');
      return;
    }
    const repeatInfo = repeatEnabled ? {
      type: repeatType,
    } : null;

    const formatLocalDate = (date) => {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    onSave({ title, date: formatLocalDate(date), startTime, endTime, description, color, calendarId: selectedCalendarId, repeat: repeatInfo });
    setTitle('');
    setDate(null);
    setIsDatePickerOpen(false);
    setStartTime('');
    setEndTime('');
    setDescription('');
    setColor(calendars.length > 0 ? calendars[0].color : '#000000');
    setSelectedCalendarId(calendars.length > 0 ? calendars[0].id : null);
    setRepeatEnabled(false);
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
    title='Create Event'
    isOpen={isOpen}
    onClose={onClose}
    className="modal-overlay"
    >
      <div className='modal-content'>
        <Inputs
        label='Title'
        type='text'
        title={title}
        onChange={e => setTitle(e.target.value)}
        placeholder='Enter title'
        className='event-input'
        />
        <div className='data-time-area'>
          <div className='data-area'>
            <Inputs
              label='Data'
              type="text"
              className="date-input"
              onClick={handleDateInputClick}
              onChange={e => {
                const newValue = e.target.value;
                setInputValue(newValue);
              }}
              value={inputValue}
              placeholder="Select date"
            />
            {isDatePickerOpen && (
              <DatePicker
                initialDate={date}
                onDateChange={handleDateSelect}
              />
            )}
          </div>
          <div className='time-area'>
            <SelectMenu label='Time' selected={startTime} onChange={setStartTime} />
            <span>-</span>
            <SelectMenu label='Time' selected={endTime} onChange={setEndTime} />
          </div>
        </div>
        <div className='repeat-area'>
          <Checkbox label='All day' checked={repeatEnabled} onChange={e => setRepeatEnabled(e.target.checked)} />
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
        <TextArea className='text-area-event' value={description} onChange={value => setDescription(value)} />
        <div className='save-event-btn'>
          <Button onClick={handleSave} variant='primary'>Save</Button>
        </div>
      </div>
    </Modal>
  );
};

export default EventModal;
