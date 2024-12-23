import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import imageVideo from '../assets/images/dummy2.png';
import { uploadVideo } from '../redux/actions/videoAction';

const BlockVideo = ({ thumbnail, name, date, videoId, isUploaded, onClick }) => {
  const dispatch = useDispatch();

  // Fetch the upload state of the video from Redux
  const videoUploadState = useSelector((state) => state.videos.uploads[videoId] || {});

  // Handle the upload button click
  const handlePost = () => {
    dispatch(uploadVideo(videoId));
  };

  // Determine the button states
  const isSuccess = isUploaded || videoUploadState.success; // Whether the video is already uploaded or upload succeeded

  return (
    <div className="blockVideo">
      <div>
        {/* Thumbnail area with click event */}
        <div className="thumbs" onClick={onClick}>
          <img src={thumbnail || imageVideo} alt="" className="hoverable-img" />
        </div>
        {/* Video name */}
        <div className="name hoverable-name">{name}</div>
      </div>
      {/* Upload date */}
      <div className="date">{date}</div>
      {/* Upload button with dynamic styles and states */}
      <button
        className={`btn-gradient ${isSuccess ? 'btn-uploaded' : 'btn-post'}`} // Dynamic class based on upload status
        type="button"
        onClick={!isSuccess ? handlePost : null} // Prevent click if already uploaded
        disabled={isSuccess} // Disable button while uploading or if already uploaded
      >
        {isSuccess ? '投稿済' : '投稿する'} {/* Dynamic button text */}
      </button>
    </div>
  );
};

export default BlockVideo;
