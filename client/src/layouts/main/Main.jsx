import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../header/Header';
import Navigation from '../nav/Navigation';

const MainLayout = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  return (
    <>
      <Header isMenuActive={isMenuActive} toggleMenu={toggleMenu} />
      <div className={`main-body content-manager ${isMenuActive ? 'toggle-menu' : ''}`}>
        <Navigation isMenuActive={isMenuActive} />
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
