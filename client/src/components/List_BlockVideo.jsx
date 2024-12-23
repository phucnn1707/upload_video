import React from 'react';
import PropTypes from 'prop-types';
import BlockVideo from './BlockVideo';

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

const BlockVideoList = ({ videos, onVideoSelect }) => {
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
