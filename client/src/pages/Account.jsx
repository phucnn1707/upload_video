import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import tiktokIcon from '../assets/images/ico-tiktok.png';
import youtubeIcon from '../assets/images/ico-youtube.png';
import { fetchLinkedAccounts } from '../redux/actions/accountActions';

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { accounts = [], loading, error } = useSelector((state) => state.account);

  useEffect(() => {
    dispatch(fetchLinkedAccounts());
  }, [dispatch]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Helper to find account by platform
  const getAccountByPlatform = (platform) => {
    return accounts.find((account) => account.platform.toLowerCase() === platform.toLowerCase());
  };

  const tiktokAccount = getAccountByPlatform('Tiktok');
  const youtubeAccount = getAccountByPlatform('Youtube');

  const handleNavigateToSNS = () => {
    navigate('/sns');
  };

  return (
    <div className="container account">
      <div className="blockHead blockFilter">
        <div className="tit">アカウント管理</div>
      </div>
      <div className="blockContent blockAccount">
        {/* Tiktok Account Info */}
        {tiktokAccount ? (
          <div className="blockAccInfo">
            <div className="name">
              <span className="ico ico-tiktok">
                <img src={tiktokIcon} alt="tiktok" />
              </span>
              <span className="txt">Tiktokアカウント</span>
            </div>
            <div className="info">
              <div className="usermail">@{tiktokAccount.platform_user_id || 'N/A'}</div>
              <button className="acc-change" type="button" onClick={handleNavigateToSNS}>
                アカウント変更
              </button>
            </div>
          </div>
        ) : (
          <div className="blockAccInfo">
            <div className="name">
              <span className="ico ico-tiktok">
                <img src={tiktokIcon} alt="tiktok" />
              </span>
              <span className="txt">Tiktokアカウント</span>
            </div>
            <div className="info">
              <div className="usermail">未連携</div>
              <button className="acc-change" type="button" onClick={handleNavigateToSNS}>
                アカウントを追加
              </button>
            </div>
          </div>
        )}

        {/* Youtube Account Info */}
        {youtubeAccount ? (
          <div className="blockAccInfo">
            <div className="name">
              <span className="ico ico-youtube">
                <img src={youtubeIcon} alt="youtube" />
              </span>
              <span className="txt">Youtubeアカウント</span>
            </div>
            <div className="info">
              <div className="usermail">{youtubeAccount.platform_user_id || 'N/A'}</div>
              <button className="acc-change" type="button" onClick={handleNavigateToSNS}>
                アカウント変更
              </button>
            </div>
          </div>
        ) : (
          <div className="blockAccInfo">
            <div className="name">
              <span className="ico ico-youtube">
                <img src={youtubeIcon} alt="youtube" />
              </span>
              <span className="txt">Youtubeアカウント</span>
            </div>
            <div className="info">
              <div className="usermail">未連携</div>
              <button className="acc-change" type="button" onClick={handleNavigateToSNS}>
                アカウントを追加
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
