import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Login from './pages/Login';
import SNS from './pages/SNS';

function NotFound() {
  return <h1>404 Not Found</h1>;
}

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* <Navigation /> */}

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/sns" element={<SNS />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
