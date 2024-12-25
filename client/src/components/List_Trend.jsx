import React from 'react';

import youtubeIcon from '../assets/images/ico-youtube.png';
import tiktokIcon from '../assets/images/ico-google.png';

const TrendList = ({ trends, onTrendClick }) => {
  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'YouTube':
        return youtubeIcon; // URL cho icon YouTube
      case 'Google':
        return tiktokIcon; // URL cho icon TikTok
      default:
        return ''; // Icon mặc định nếu không xác định được platform
    }
  };

  return (
    <div className="blockContent trend-list">
      <ul>
        {trends.map((trend, index) => (
          <li
            key={index}
            onClick={(e) => {
              e.preventDefault();
              onTrendClick(trend);
            }}
            style={{ cursor: 'pointer' }}
          >
            <img src={getPlatformIcon(trend.platform)} alt={trend.platform} className="platform-icon" />
            <a>#{trend.keyword}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendList;
