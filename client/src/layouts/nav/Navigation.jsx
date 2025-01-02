import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const navLinks = [
  { to: '/create-script', label: '❖　スクリプト生成' },
  { to: '/create-video', label: '❖　動画生成' },
  { to: '/video', label: '❖　動画一覧' },
  { to: '/account', label: '❖　アカウント管理' },
];

function Navigation({ isMenuActive }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('platformState');
    navigate('/login');
  };

  return (
    <div className={`menu ${isMenuActive ? 'toggle' : ''}`}>
      <ul>
        {navLinks.map(({ to, label }, index) => (
          <li key={index}>
            <NavLink to={to} activeClassName="active">
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="logout">
        <button onClick={handleLogout}>ログアウト</button>
      </div>
    </div>
  );
}

export default Navigation;
