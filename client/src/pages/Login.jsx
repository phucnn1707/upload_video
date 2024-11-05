import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/authAction';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleLogin = () => {
    dispatch(login(id, password, navigate));
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
            <button className="button btn-gradient" type="button" onClick={handleLogin} disabled={loading}>
              {loading ? 'ログイン中...' : 'ログイン'}
            </button>
            {error && <p className="error">{error}</p>}
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
