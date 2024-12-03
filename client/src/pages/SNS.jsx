import React from 'react';

const SNS = () => {
  return (
    <>
      <section className="main-body content-login">
        <div className="login">
          <div className="logo">
            <a href="/">VIDEO AI</a>
          </div>
          <div className="title">SNSアカウントと連携</div>
          <form>
            <a className="button btn-gradient btn-tiktok" href="#">
              Tiktokアカウント連携
            </a>
            <a className="button btn-gradient btn-youtube" href="#">
              Youtubeアカウント連携
            </a>
          </form>
        </div>
      </section>
    </>
  );
};

export default SNS;
