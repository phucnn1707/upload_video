import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Navigation({ isMenuActive }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');

    navigate('/login');
  };

  return (
    <>
      <div className={`menu ${isMenuActive ? 'toggle' : ''}`}>
        <ul>
          <li>
            <NavLink to="/create-script" activeClassName="active">
              ❖　スクリプト生成
            </NavLink>
          </li>
          <li>
            <NavLink to="/create-video" activeClassName="active">
              ❖　動画生成
            </NavLink>
          </li>
          <li>
            <NavLink to="/video" activeClassName="active">
              ❖　動画一覧
            </NavLink>
          </li>
          <li>
            <NavLink to="/account" activeClassName="active">
              ❖　アカウント管理
            </NavLink>
          </li>
        </ul>
        <div className="logout">
          <button onClick={handleLogout}>ログアウト</button>
        </div>
      </div>
    </>
  );
}

export default Navigation;
