import React from 'react';

function TrendList({ trends }) {
  return (
    <div className="blockContent trend-list">
      <ul>
        {trends.map((trend, index) => (
          <li key={index}>
            <a href={trend.url}>{trend.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TrendList;
