import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.scss';

function Navigation() {
  return (
    <div className="left-nav">
      <NavLink exact="true" to="/">
        Home
      </NavLink>
      <NavLink to="/s1">S1</NavLink>
      <NavLink to="/s2">S2</NavLink>
    </div>
  );
}

export default Navigation;
