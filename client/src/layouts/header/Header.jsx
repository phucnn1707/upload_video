import React from 'react';
import userIcon from '../../assets/images/ico-user.svg';

const Header = ({ isMenuActive, toggleMenu }) => {
  return (
    <header className="header">
      <div className="header-logo logo">
        <a href="./">VIDEO AI</a>
        <div className={`icon-hamburger ${isMenuActive ? 'active' : ''}`} onClick={toggleMenu}>
          <div className="icon-bar">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      <div className="header-info">
        <div className="user">
          <span className="name">name</span>
          <span className="ico">
            <img src={userIcon} alt="User Icon" />
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
