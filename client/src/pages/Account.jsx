import React from 'react';
import tiktokIcon from '../assets/images/ico-tiktok.png';
import youtubeIcon from '../assets/images/ico-youtube.png';

const Account = () => {
  return (
    <div className="container account">
      <div className="blockHead blockFilter">
        <div className="tit">アカウント管理</div>
      </div>
      <div className="blockContent blockAccount">
        {/* Tiktok Account Info */}
        <div className="blockAccInfo">
          <div className="name">
            <span className="ico ico-tiktok">
              <img src={tiktokIcon} alt="tiktok" />
            </span>
            <span className="txt">Tiktokアカウント</span>
          </div>
          <div className="info">
            <div className="usermail">＠abcdef123</div>
            <button className="acc-change" type="button">
              アカウント変更
            </button>
          </div>
        </div>

        {/* Youtube Account Info */}
        <div className="blockAccInfo">
          <div className="name">
            <span className="ico ico-youtube">
              <img src={youtubeIcon} alt="youtube" />
            </span>
            <span className="txt">Youtubeアカウント</span>
          </div>
          <div className="info">
            <div className="usermail">abcdef123@gmail.com</div>
            <button className="acc-change" type="button">
              アカウント変更
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
