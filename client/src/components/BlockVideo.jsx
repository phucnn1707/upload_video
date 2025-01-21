import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import imageVideo from '../assets/images/dummy2.png';
import { uploadVideo, mergeVideo, fetchVideos } from '../redux/actions/videoAction';
import { fetchSubtitle, saveSubtitle, clearSubtitle } from '../redux/actions/subtitleActions';
import { toast } from 'react-toastify';
import SubtitleEditorModal from './SubtitleEditorModal';

const BlockVideo = ({
  thumbnail,
  name,
  date,
  videoId,
  isUploaded,
  onClick,
  subTitleURL,
  videoPath,
  srtPath,
  textScriptId,
}) => {
  const dispatch = useDispatch();

  // Fetch states from Redux
  const { subtitle, loading: subtitleLoading } = useSelector((state) => state.subtitle);
  const videoUploadState = useSelector((state) => state.videos.uploads[videoId] || {});
  const videoMergeState = useSelector((state) => state.videos.merges[videoId] || {});

  const [isModalOpen, setModalOpen] = useState(false);
  const [editedSubtitle, setEditedSubtitle] = useState('');

  // Open modal and fetch subtitle
  const openSubtitleModal = async () => {
    setModalOpen(true);
    const response = await dispatch(fetchSubtitle(subTitleURL)); // API call
    if (response) {
      setEditedSubtitle(response);
    }
  };

  // Sync Redux subtitle to local state for editing
  useEffect(() => {
    if (subtitle) {
      setEditedSubtitle(subtitle);
    }
  }, [subtitle]);

  const closeSubtitleModal = () => {
    setModalOpen(false);
    dispatch(clearSubtitle());
  };

  // Save subtitle
  const handleSaveSubtitle = async () => {
    await dispatch(saveSubtitle(subTitleURL, editedSubtitle));
    closeSubtitleModal();
  };

  // Merge video and subtitles
  const handleMerge = async () => {
    try {
      await dispatch(mergeVideo(videoId, videoPath, srtPath, textScriptId));
      toast.success('動画の結合が完了しました！');
      await dispatch(fetchVideos());
    } catch (error) {
      toast.error(error.message || '動画の結合に失敗しました。');
    }
  };

  const handlePost = async () => {
    try {
      await dispatch(uploadVideo(videoId));
      toast.success('動画のアップロードが成功しました！');
    } catch (error) {
      toast.error('動画のアップロードに失敗しました。');
    }
  };

  const isSuccess = isUploaded || videoUploadState.success;

  return (
    <div className="blockVideo">
      <div>
        <div className="thumbs" onClick={onClick}>
          <img src={thumbnail || imageVideo} alt="" className="hoverable-img" />
        </div>
        <div className="name hoverable-name">{name}</div>
      </div>
      <div className="date">{date}</div>
      <div className="button-group">
        <button className="btn-secondary btn-subtitle" type="button" onClick={openSubtitleModal}>
          字幕
        </button>
        <button
          className="btn-secondary btn-merge"
          type="button"
          onClick={!videoMergeState.loading ? handleMerge : null}
          disabled={videoMergeState.loading}
        >
          {videoMergeState.loading ? '結合中...' : '結合'}
        </button>
        <button
          className={`btn-gradient ${isSuccess ? 'btn-uploaded' : 'btn-post'}`}
          type="button"
          onClick={!isSuccess ? handlePost : null}
          disabled={isSuccess}
        >
          {isSuccess ? '投稿済' : videoUploadState.loading ? '投稿中...' : '投稿する'}
        </button>
      </div>

      <SubtitleEditorModal
        isOpen={isModalOpen}
        onClose={closeSubtitleModal}
        subtitle={editedSubtitle}
        onSubtitleChange={setEditedSubtitle}
        onSave={handleSaveSubtitle}
        isLoading={subtitleLoading}
      />
    </div>
  );
};

export default BlockVideo;
