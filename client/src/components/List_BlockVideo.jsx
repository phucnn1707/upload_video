import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import BlockVideo from './BlockVideo';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

const BlockVideoList = ({ videos, onVideoSelect }) => {
  const { saveSuccess, error } = useSelector((state) => state.subtitle);

  useEffect(() => {
    if (saveSuccess) {
      toast.success('字幕が保存されました！');
    } else if (error) {
      toast.error('字幕データの取得に失敗しました。');
    }
  }, [saveSuccess, error]);

  if (!videos || videos.length === 0) {
    return (
      <div className="blockContent blockVideoList">
        <p className="no-videos">表示する動画がありません。</p>
      </div>
    );
  }

  return (
    <div className="blockContent blockVideoList">
      {videos.map((video) => (
        <BlockVideo
          videoId={video.video_id}
          thumbnail={video.image_url}
          name={video.textScript?.title}
          date={formatDate(video.is_uploaded ? video.uploaded_at : video.createdAt)}
          isPosted={video.is_uploaded}
          isUploaded={video.is_uploaded}
          onClick={() => onVideoSelect(video)}
          subTitleURL={video.srt_file_url}
          textScriptId={video.script_id}
          videoPath={video.video_url}
          srtPath={video.srt_file_url}
        />
      ))}
    </div>
  );
};

BlockVideoList.propTypes = {
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      video_id: PropTypes.number.isRequired,
      image_url: PropTypes.string.isRequired,
      textScript: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
      createdAt: PropTypes.string.isRequired,
      is_uploaded: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onVideoSelect: PropTypes.func.isRequired,
};

export default BlockVideoList;
