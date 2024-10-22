import React from 'react';
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <>
      <div className="menu">
        <ul>
          <li>
            <NavLink to="/create" classNamelassName="active">
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
          <a href="#">ログアウト</a>
        </div>
      </div>
    </>
  );
}

export default Navigation;
