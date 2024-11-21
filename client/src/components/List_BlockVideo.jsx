import React from 'react';
import BlockVideo from './BlockVideo';

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
          thumbnail={video.thumbnail}
          name={video.title}
          date={video.date}
          isPosted={video.isPosted}
          onClick={() => onVideoSelect(video)}
        />
      ))}
    </div>
  );
};

export default BlockVideoList;
