// src/components/SNS.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { linkPlatformAccount, handleOAuthSuccess, handleOAuthFailure } from '../redux/actions/platformActions';

const SNS = () => {
  const dispatch = useDispatch();
  const platformState = useSelector((state) => state.platform);
  const location = useLocation();
  const navigate = useNavigate();

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const platform = queryParams.get('platform');
    const status = queryParams.get('status');
    const userPlatformId = queryParams.get('platform_user_id');
    const error = queryParams.get('error');

    if (platform && status) {
      if (status === 'success') {
        setSuccessMessage(`${platform.toUpperCase()} アカウントが正常に連携されました！`);
        setErrorMessage('');
        dispatch(handleOAuthSuccess(platform, userPlatformId));
      } else if (status === 'error') {
        const errorMessage =
          error || `${platform.toUpperCase()} アカウントの連携に失敗しました。もう一度お試しください。`;
        setErrorMessage(errorMessage);
        setSuccessMessage('');
        dispatch(handleOAuthFailure(platform, errorMessage));
      }
    }
  }, [location, dispatch]);

  const handlePlatformLink = (platform) => {
    dispatch(linkPlatformAccount(platform));
  };

  const handleNavigateHome = () => {
    navigate('/'); // Điều hướng về trang Home
  };

  const LinkButton = ({ platform, label, successText }) => {
    const state = platformState[platform];

    return (
      <button
        type="button"
        className={`button btn-gradient btn-${platform} ${
          state.success ? 'linked' : ''
        } ${state.loading ? 'disabled' : ''}`}
        onClick={() => handlePlatformLink(platform)}
        // disabled={state.loading || state.success}
      >
        {state.loading
          ? '接続中...'
          : state.success
            ? `${successText} (${state.userPlatformId || '不明なユーザー'})`
            : `${label} と連携`}
      </button>
    );
  };

  return (
    <section className="main-body content-login">
      {/* Home Icon */}
      <div className="home-icon" onClick={handleNavigateHome}></div>

      <div className="login">
        <div className="logo">
          <a href="/">VIDEO AI</a>
        </div>
        <div className="title">SNSアカウントと連携</div>

        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <form>
          <LinkButton platform="tiktok" label="TikTok" successText="TikTok 連携済み" />
          {platformState.tiktok.error && <p className="error-message">{platformState.tiktok.error}</p>}

          <LinkButton platform="youtube" label="YouTube" successText="YouTube 連携済み" />
          {platformState.youtube.error && <p className="error-message">{platformState.youtube.error}</p>}
        </form>
      </div>
    </section>
  );
};

export default SNS;
