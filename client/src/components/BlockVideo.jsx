import React from 'react';
import imageVideo from '../assets/images/dummy2.png';

const BlockVideo = ({ thumbnail, name, date, isPosted, onClick }) => {
  return (
    <div className="blockVideo">
      <div>
        <div className="thumbs" onClick={onClick}>
          <img src={thumbnail || imageVideo} alt="" className="hoverable-img" />
        </div>
        <div className="name hoverable-name">{name}</div>
      </div>
      <div className="date">{date}</div>
      <button className={`btn-gradient ${isPosted ? 'btn-posted' : 'btn-post'}`} type="button">
        {isPosted ? '投稿済' : '投稿する'}
      </button>
    </div>
  );
};

export default BlockVideo;
