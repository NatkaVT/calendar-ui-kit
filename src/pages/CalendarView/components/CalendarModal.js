import React, { useState, useEffect } from 'react';
import ColorPicker from '../../../ui-kit/ColorPicker';
import Modal from '../../../ui-kit/Modal';
import Button from '../../../ui-kit/Button';
import Inputs from '../../../ui-kit/Inputs'
import './CalendarModal.css';

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

  const handleSave = () => {
    if (name.trim() === '') {
      alert('Please enter a calendar name.');
      return;
    }
    onSave(name, color);
    setName('');
    setColor(defaultColors[0]);
  };

  const handleClose = () => {
    setName('');
    setColor(defaultColors[0]);
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
      <label>Title:</label>
      <Inputs
      type='text'
      value={name}
      className='input'
      onChange={(e) => setName(e.target.value)}
      placeholder="Enter calendar name"
      />
      <ColorPicker
      colors={defaultColors}
      selected={color}
      onColorSelect={setColor}
      className="colorPicker"
      key={color}
      />
      <div className="calendar-modal-buttons">
        <Button onClick={handleSave} variant='primary'>Save</Button>
      </div>

    </Modal>
  );
};

export default CalendarModal;
