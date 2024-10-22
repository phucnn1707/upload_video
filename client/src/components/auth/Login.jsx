import React from 'react';

const Login = () => {
  return (
    <>
      <section className="main-body content-login">
        <div className="login">
          <div className="logo">
            <a href="#">VIDEO AI</a>
          </div>
          <div className="title">ログイン</div>
          <form>
            <input type="text" placeholder="ID" />
            <input type="password" placeholder="パスワード" />
            <button className="button btn-gradient" type="button">
              ログイン
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
