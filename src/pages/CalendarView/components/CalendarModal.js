import React, { useState, useEffect } from 'react';
import ColorPicker from '../../../ui-kit/ColorPicker';
import Modal from '../../../ui-kit/Modal';
import Button from '../../../ui-kit/Button';
import Inputs from '../../../ui-kit/Inputs'
import './CalendarModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faT, faPalette } from '@fortawesome/free-solid-svg-icons';

const defaultColors = [
  '#9F2957', 
  '#D90056', 
  '#E25D33', 
  '#DFC45A', 
  '#B8C42F', 
  '#16AF6E', 
  '#429488', 
  '#397E49', 
  '#439BDF', 
  '#4254AF', 
  '#6C7AC4', 
  '#8332A4'
];

const CalendarModal = ({ isOpen, onClose, onSave, initialName, initialColor }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState(defaultColors[0]);
  const [hasError, setHasError] = useState(false);

  const handleSave = () => {
    if (name.trim() === '') {
      setHasError(true);
      return;
    }
    setHasError(false);
    onSave(name, color);
    setName('');
    setColor(defaultColors[0]);
  };

  const handleClose = () => {
    setName('');
    setColor(defaultColors[0]);
    setHasError(false);
    onClose();
  };

  useEffect(() => {
    setName(initialName || '');
    setColor(initialColor || defaultColors[0]);
  }, [initialName, initialColor, isOpen]);

  if (!isOpen) return null;

  const isEditing = initialName && initialName.trim() !== '';

  return (
    <Modal
    title={isEditing ? 'Edit calendar' : 'Create calendar'}
    onClose={handleClose}
    isOpen={isOpen}
    onClick={e => e.stopPropagation()}
    className="calendar-modal-overlay"
    >
      <div className='calendar-modal-name'>
        <FontAwesomeIcon icon={faT} size='sm' color='#5B5F6E'/>
        <div className='calendar-modal-name-content'>
          <h5>Title:</h5>
          <Inputs
          type='text'
          value={name}
          className={`input ${hasError ? 'input-error' : ''}`}
          onChange={(e) => {
            setName(e.target.value);
            if (hasError && e.target.value.trim() !== '') {
              setHasError(false);
            }
          }}
          placeholder="Enter calendar name"
          />
        </div>
      </div>
      <div className='calendar-modal-color'>
        <FontAwesomeIcon icon={faPalette} size='sm' color='#5B5F6E'/>
        <div className='calendar-modal-color-content'>
          <ColorPicker
          colors={defaultColors}
          selected={color}
          onColorSelect={setColor}
          className="colorPicker"
          key={color}
          />
        </div>
      </div>
      
      <div className="calendar-modal-buttons">
        <Button onClick={handleSave} variant='primary'>Save</Button>
      </div>

    </Modal>
  );
};

export default CalendarModal;
