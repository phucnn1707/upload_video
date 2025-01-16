import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import imageVideo from '../assets/images/dummy2.png';
import { uploadVideo } from '../redux/actions/videoAction';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import fs from 'fs';

const BlockVideo = ({ thumbnail, name, date, videoId, isUploaded, onClick }) => {
  const dispatch = useDispatch();

  // Fetch the upload state of the video from Redux
  const videoUploadState = useSelector((state) => state.videos.uploads[videoId] || {});

  // Local state for subtitle modal
  const [isSubtitleModalOpen, setIsSubtitleModalOpen] = useState(false);
  const [subtitleContent, setSubtitleContent] = useState('');

  // Handle opening the subtitle modal
  const openSubtitleModal = async () => {
    const filePath = `${process.env.PUBLIC_URL}/video/${videoId}.srt`;

    try {
      const response = await fetch(filePath);
      if (!response.ok) throw new Error('Subtitle file not found');
      const text = await response.text();
      setSubtitleContent(text);
      setIsSubtitleModalOpen(true);
    } catch (error) {
      toast.error('字幕ファイルの読み込みに失敗しました。');
    }
  };

  // Handle saving the edited subtitle
  const saveSubtitle = async () => {
    try {
      // Simulate saving the file (replace this part with an API call if needed)
      const blob = new Blob([subtitleContent], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${videoId}.srt`;
      link.click();
      toast.success('字幕ファイルを保存しました！');
      setIsSubtitleModalOpen(false);
    } catch (error) {
      toast.error('字幕ファイルの保存に失敗しました。');
    }
  };

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
      {/* Buttons in a row */}
      <div className="button-group">
        <button className="btn-secondary btn-subtitle" type="button" onClick={openSubtitleModal}>
          字幕
        </button>
        <button
          className="btn-secondary btn-merge"
          type="button"
          onClick={() => toast.info('結合機能は現在準備中です。')}
        >
          結合
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

      {/* Subtitle Modal */}
      <Modal
        isOpen={isSubtitleModalOpen}
        onRequestClose={() => setIsSubtitleModalOpen(false)}
        contentLabel="Edit Subtitle"
        className="modalVideo-content"
        overlayClassName="modalVideo-overlay"
      >
        <h2>字幕を編集</h2>
        <textarea
          value={subtitleContent}
          onChange={(e) => setSubtitleContent(e.target.value)}
          rows={15}
          style={{ width: '100%', padding: '10px', fontSize: '16px', fontFamily: 'monospace' }}
        />
        <div style={{ marginTop: '15px', textAlign: 'right' }}>
          <button className="btn-cancel" onClick={() => setIsSubtitleModalOpen(false)}>
            キャンセル
          </button>
          <button className="btn-confirm" onClick={saveSubtitle}>
            保存
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default BlockVideo;
