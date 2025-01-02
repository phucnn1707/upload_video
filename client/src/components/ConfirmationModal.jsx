import React from 'react';

const ConfirmationModal = ({ isOpen, onConfirm, onCancel, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modalConfirm-overlay active">
      <div className="modalConfirm-content">
        <h2 className="modalConfirm-title">確認</h2>
        <p className="modalConfirm-message">{message}</p>
        <div className="modalConfirm-actions">
          <button className="btn-confirm" onClick={onConfirm}>
            OK
          </button>
          <button className="btn-cancel" onClick={onCancel}>
            キャンセル
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
