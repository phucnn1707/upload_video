import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/authAction';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const validationErrors = {};
    if (!id.trim()) {
      validationErrors.id = 'メールアドレスを入力してください。';
    } else if (!validateEmail(id)) {
      validationErrors.id = '有効なメールアドレスを入力してください。';
    }

    if (!password.trim()) {
      validationErrors.password = 'パスワードを入力してください。';
    } else if (password.length < 6) {
      validationErrors.password = 'パスワードは6文字以上でなければなりません。';
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleLogin = () => {
    if (validateForm()) {
      dispatch(login(id, password, navigate));
    }
  };

  return (
    <>
      <section className="main-body content-login">
        <div className="login">
          <div className="logo">
            <a href="#">VIDEO AI</a>
          </div>
          <div className="title">ログイン</div>
          <form onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="メールアドレス" value={id} onChange={(e) => setId(e.target.value)} />
            {errors.id && <p className="error">{errors.id}</p>}

            <input
              type="password"
              placeholder="パスワード"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="error">{errors.password}</p>}

            {!errors.id && !errors.password && error && <p className="error">{error}</p>}

            <button className="button btn-gradient" type="button" onClick={handleLogin} disabled={loading}>
              {loading ? 'ログイン中...' : 'ログイン'}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
