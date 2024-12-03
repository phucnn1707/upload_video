import React from 'react';
import PropTypes from 'prop-types';
import BlockVideo from './BlockVideo';

const formatDate = (dateString) => {
  if (!dateString) return '';
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
          key={video.id}
          thumbnail={video.image_url}
          name={video.textScript?.title}
          date={formatDate(video.is_uploaded ? video.date : video.createdAt)}
          isPosted={video.is_uploaded}
          onClick={() => onVideoSelect(video)}
        />
      ))}
    </div>
  );
};

BlockVideoList.propTypes = {
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      image_url: PropTypes.string.isRequired,
      textScript: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
      createdAt: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      is_uploaded: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onVideoSelect: PropTypes.func.isRequired,
};

export default BlockVideoList;
