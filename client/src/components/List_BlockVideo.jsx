import React from 'react';
import BlockVideo from './BlockVideo';

const BlockVideoList = ({ videos }) => {
  return (
    <div className="blockContent blockVideoList">
      {videos.map((video, index) => (
        <BlockVideo
          key={index}
          thumbnail={video.thumbnail}
          name={video.name}
          date={video.date}
          isPosted={video.isPosted}
        />
      ))}
    </div>
  );
};

export default BlockVideoList;
