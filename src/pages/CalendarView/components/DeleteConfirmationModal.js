import React from 'react';
import Modal from '../../../ui-kit/Modal';
import Button from '../../../ui-kit/Button';
import './DeleteConfirmationModal.css';

const DeleteConfirmationModal = ({ isOpen, onConfirm, onCancel, itemName, itemType }) => {
  if (!isOpen) return null;

  const title = itemType === 'event' ? 'Delete event' : 'Delete calendar';
  const message = itemType === 'event' 
    ? `Are you sure you want to delete the event "${itemName}"? You'll no longer have access to it.`
    : `Are you sure you want to delete the calendar "${itemName}"? You'll no longer have access to this calendar and its events.`;

  return (
    <Modal
    title={title}
    isOpen={isOpen}
    onClose={onCancel}
    onClick={e => e.stopPropagation()}
    className='delete-modal-overlay'>
      <p>{message}</p>
      <div className="delete-modal-buttons">
        <Button onClick={onConfirm} variant='primary'>Delete</Button>
        <Button onClick={onCancel} variant='secondary'>Cancel</Button>
      </div>
    </Modal>
    
  );
};

export default DeleteConfirmationModal;
