import React from 'react';

const TrendList = ({ trends, onTrendClick }) => {
  return (
    <div className="blockContent trend-list">
      <ul>
        {trends.map((trend, index) => (
          <li key={index}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onTrendClick(trend);
              }}
            >
              #{trend.keyword}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendList;
