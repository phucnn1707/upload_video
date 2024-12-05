import React, { useState } from 'react';

const AvatarModal = ({ avatars, onClose, onSelect }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const handleAvatarClick = (avatar) => {
    setSelectedAvatar(avatar);
  };

  const handleGenerate = () => {
    if (selectedAvatar) {
      console.log('Generating with:', selectedAvatar);
      onSelect(selectedAvatar);
    }
  };

  return (
    <div className="modalAvatar-overlay active">
      <div className="modalAvatar-content">
        <button className="modalAvatar-close" onClick={onClose}>
          ×
        </button>
        <h2>生成するアバターを選択してください</h2>
        <div className="avatarList">
          {avatars.map((avatar) => (
            <div
              key={avatar.id}
              className={`avatarItem ${selectedAvatar?.id === avatar.id ? 'selected' : ''}`}
              onClick={() => handleAvatarClick(avatar)}
            >
              <img src={avatar.avatar_url} alt={`アバター ${avatar.id}`} />
            </div>
          ))}
        </div>
        <div className="modalActions">
          <button className="btn closeButton" onClick={onClose}>
            キャンセル
          </button>
          <button className="generateButton btn-gradient" onClick={handleGenerate} disabled={!selectedAvatar}>
            動画生成
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvatarModal;
