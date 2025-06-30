import React from 'react';
import Modal from '../../../ui-kit/Modal';
import Button from '../../../ui-kit/Button';
import './DeleteConfirmationModal.css';

const DeleteConfirmationModal = ({ isOpen, onConfirm, onCancel, calendarName }) => {
  if (!isOpen) return null;

  return (
    <Modal
    title='Delete calendar'
    isOpen={isOpen}
    onClose={onCancel}
    onClick={e => e.stopPropagation()}
    className='delete-modal-overlay'>
      <p>Are you sure you want to delete the calendar "{calendarName}" You'll no longer have access to this calendar and its events.</p>
      <div className="delete-modal-buttons">
        <Button onClick={onConfirm} variant='primary'>Delete</Button>
        <Button onClick={onCancel} variant='secondary'>Cancel</Button>
      </div>
    </Modal>
    
  );
};

export default DeleteConfirmationModal;
