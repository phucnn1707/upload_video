import React, { useState } from 'react';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Logging in with:', id, password);
  };

  return (
    <>
      <section className="main-body content-login">
        <div className="login">
          <div className="logo">
            <a href="#">VIDEO AI</a>
          </div>
          <div className="title">ログイン</div>
          <form>
            <input type="text" placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
            <input
              type="password"
              placeholder="パスワード"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="button btn-gradient" type="button" onClick={handleLogin}>
              ログイン
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
