import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Login from './components/auth/Login';

function Home() {
  return <h1>Home Page</h1>;
}

function S1() {
  return <h1>S1 Page</h1>;
}

function S2() {
  return <h1>S2 Page</h1>;
}

function NotFound() {
  return <h1>404 Not Found</h1>;
}

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* <Navigation /> */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/s1" element={<S1 />} />
          <Route path="/s2" element={<S2 />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
