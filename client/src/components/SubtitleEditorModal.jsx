import React, { useState, useEffect } from 'react';

const SubtitleEditorModal = ({ isOpen, onClose, subtitle, onSubtitleChange, onSave }) => {
  const [localSubtitle, setLocalSubtitle] = useState('');

  useEffect(() => {
    if (subtitle) {
      setLocalSubtitle(subtitle);
    }
  }, [subtitle]);

  const handleSubtitleChange = (e) => {
    setLocalSubtitle(e.target.value);
    onSubtitleChange(e.target.value);
  };

  return (
    <div className={`modalSubtitle-overlay ${isOpen ? 'active' : ''}`}>
      <div className="modalSubtitle-content">
        <button className="modalSubtitle-close" onClick={onClose}>
          &times;
        </button>
        <h2 className="modalSubtitle-title">字幕編集</h2>
        <textarea
          className="modalSubtitle-textarea"
          value={localSubtitle}
          onChange={handleSubtitleChange}
          rows={20}
        ></textarea>
        <div className="modalSubtitle-actions">
          <button className="btn-subtitle-cancel" onClick={onClose}>
            戻る
          </button>
          <button className="btn-subtitle-save" onClick={onSave}>
            確定
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubtitleEditorModal;
