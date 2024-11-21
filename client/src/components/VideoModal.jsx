import React from 'react';

const ModalVideo = ({ isOpen, video, onClose }) => {
  if (!video) return null;

  return (
    <div className={`modalVideo-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
      <div className="modalVideo-content" onClick={(e) => e.stopPropagation()}>
        <button className="modalVideo-close" onClick={onClose}>
          &times;
        </button>
        <h2>{video.title}</h2>
        <video controls>
          <source src={video.videoUrl} type="video/mp4" />
          Trình duyệt của bạn không hỗ trợ video.
        </video>
      </div>
    </div>
  );
};

export default ModalVideo;
