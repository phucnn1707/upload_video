import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import imageVideo from '../assets/images/dummy2.png';
import { uploadVideo } from '../redux/actions/videoAction';
import { toast } from 'react-toastify';

const BlockVideo = ({ thumbnail, name, date, videoId, isUploaded, onClick }) => {
  const dispatch = useDispatch();

  // Fetch the upload state of the video from Redux
  const videoUploadState = useSelector((state) => state.videos.uploads[videoId] || {});

  // Handle the upload button click
  const handlePost = async () => {
    try {
      await dispatch(uploadVideo(videoId));
      toast.success('動画のアップロードが成功しました！');
    } catch (error) {
      toast.error('動画のアップロードに失敗しました。');
    }
  };

  // Determine the button states
  const isSuccess = isUploaded || videoUploadState.success;

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
        className={`btn-gradient ${isSuccess ? 'btn-uploaded' : 'btn-post'}`}
        type="button"
        onClick={!isSuccess ? handlePost : null}
        disabled={isSuccess}
      >
        {isSuccess ? '投稿済' : videoUploadState.loading ? '投稿中...' : '投稿する'}
      </button>
    </div>
  );
};

export default BlockVideo;
