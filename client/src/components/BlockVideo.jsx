import React from 'react';
import imageVideo from '../assets/images/dummy2.png';

const BlockVideo = ({ thumbnail, name, date, isPosted }) => {
  return (
    <div className="blockVideo">
      <div className="thumbs">
        <img src={thumbnail || imageVideo} alt="" />
      </div>
      <div className="name">{name}</div>
      <div className="date">{date}</div>
      <button className={`btn-gradient ${isPosted ? 'btn-posted' : 'btn-post'}`} type="button">
        {isPosted ? '投稿済' : '投稿する'}
      </button>
    </div>
  );
};

export default BlockVideo;
