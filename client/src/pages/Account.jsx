import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import tiktokIcon from '../assets/images/ico-tiktok.png';
import youtubeIcon from '../assets/images/ico-youtube.png';
import searchApiKeyIcon from '../assets/images/key.png';
import viewIcon from '../assets/images/view.png';
import hideIcon from '../assets/images/hide.png';
import { fetchLinkedAccounts } from '../redux/actions/accountAction';
import { fetchApiKeyByServiceName } from '../redux/actions/apiKeyAction';

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { accounts = [], loading: accountsLoading, error: accountsError } = useSelector((state) => state.account);
  const { searchApiKey, loading: apiKeyLoading, error: apiKeyError } = useSelector((state) => state.apiKey);

  useEffect(() => {
    dispatch(fetchLinkedAccounts());
    dispatch(fetchApiKeyByServiceName('searchapi'));
  }, [dispatch]);

  const getAccountByPlatform = (platform) =>
    accounts.find((account) => account.platform.toLowerCase() === platform.toLowerCase());

  const tiktokAccount = getAccountByPlatform('tiktok');
  const youtubeAccount = getAccountByPlatform('youtube');

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleNavigateToSNS = () => {
    navigate('/sns');
  };

  if (accountsLoading || apiKeyLoading) {
    return <div>Loading...</div>;
  }

  if (accountsError) {
    return <div>Error fetching accounts: {accountsError}</div>;
  }

  if (apiKeyError) {
    return <div>Error fetching API Key: {apiKeyError}</div>;
  }

  return (
    <div className="container account">
      <div className="blockHead blockFilter">
        <div className="tit">アカウント管理</div>
      </div>
      <div className="blockContent blockAccount">
        {/* TikTok Account */}
        <div className="blockAccInfo">
          <div className="name">
            <span className="ico ico-tiktok">
              <img src={tiktokIcon} alt="tiktok" />
            </span>
            <span className="txt">Tiktokアカウント</span>
          </div>
          <div className="info">
            {tiktokAccount ? (
              <>
                <div className="usermail">@{tiktokAccount.platform_user_id || 'N/A'}</div>
                <button className="acc-change" type="button" onClick={handleNavigateToSNS}>
                  アカウント変更
                </button>
              </>
            ) : (
              <>
                <div className="usermail">未連携</div>
                <button className="acc-change" type="button" onClick={handleNavigateToSNS}>
                  アカウントを追加
                </button>
              </>
            )}
          </div>
        </div>

        {/* YouTube Account */}
        <div className="blockAccInfo">
          <div className="name">
            <span className="ico ico-youtube">
              <img src={youtubeIcon} alt="youtube" />
            </span>
            <span className="txt">Youtubeアカウント</span>
          </div>
          <div className="info">
            {youtubeAccount ? (
              <>
                <div className="usermail">{youtubeAccount.platform_user_id || 'N/A'}</div>
                <button className="acc-change" type="button" onClick={handleNavigateToSNS}>
                  アカウント変更
                </button>
              </>
            ) : (
              <>
                <div className="usermail">未連携</div>
                <button className="acc-change" type="button" onClick={handleNavigateToSNS}>
                  アカウントを追加
                </button>
              </>
            )}
          </div>
        </div>

        {/* Search API Key */}
        <div className="blockAccInfo">
          <div className="name">
            <span className="ico icon-searchapi">
              <img src={searchApiKeyIcon} alt="Search API" />
            </span>
            <span className="txt">Search API</span>
            <a
              href="https://www.searchapi.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="get-api-link"
              title="APIキーを取得するにはここをクリックしてください"
            >
              APIキーを取得
            </a>
          </div>
          <div className="info">
            <div className="input-wrapper">
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                className="input-api-key"
                placeholder="APIキーを入力してください"
                value={searchApiKey || ''}
              />
              <span
                className="toggle-visibility"
                onClick={togglePasswordVisibility}
                title={isPasswordVisible ? 'Hide API Key' : 'Show API Key'}
              >
                <img src={isPasswordVisible ? hideIcon : viewIcon} alt={isPasswordVisible ? 'Hide' : 'Show'} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
