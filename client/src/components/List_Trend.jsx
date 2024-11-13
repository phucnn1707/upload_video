import React from 'react';

const TrendList = ({ trends, onTrendClick }) => {
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
            <a>#{trend.keyword}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendList;
