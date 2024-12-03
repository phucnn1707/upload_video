import React from 'react';
import imageVideo from '../assets/images/dummy.png';

const CreateView = () => {
  const handleCancelClick = () => {
    alert('キャンセルされました');
  };

  const handlePublishClick = () => {
    alert('SNSに投稿しました');
  };

  return (
    <div className="container create">
      <div className="blockView">
        <div className="video">
          <img src={imageVideo} alt="Video Preview" />
        </div>
        <div className="dflex">
          <button className="btn-cancel" onClick={handleCancelClick}>
            キャンセル
          </button>
          <button className="btn-gradient btn-publish" onClick={handlePublishClick}>
            SNSに投稿
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateView;
