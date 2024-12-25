import React from 'react';

const URL = import.meta.env.VITE_VIDEO_URL;

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
          <source src={`${URL}${video.video_url}`} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default ModalVideo;
