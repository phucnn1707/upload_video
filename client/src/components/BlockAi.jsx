import React from 'react';

const BlockAi = ({ name, detail, tag, onEditClick, onGenerateClick }) => {
  return (
    <div className="blockAiDesc">
      <div className="name">{name}</div>
      <div className="detail">{detail}</div>
      <div className="footer">
        <div className="tag">
          {/* {tags.map((tag, index) => (
            <a href="#" key={index}>
              {tag}
            </a>
          ))} */}
          <a>#{tag}</a>
        </div>
        <div className="button">
          <button className="btn-edit" type="button" onClick={onEditClick}>
            編集
          </button>
          <button className="btn-gradient btn-generate" type="button" onClick={onGenerateClick}>
            動画生成
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlockAi;
