import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SNS from './pages/SNS';
import Create from './pages/Create';
import MainLayout from './layouts/main/Main';

const NotFound = () => {
  return <h1>404 Not Found</h1>;
};

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/sns" element={<SNS />} />
          <Route element={<MainLayout />}>
            <Route path="/create" element={<Create />} />
            <Route path="/create-view" />
            <Route path="/video" />
            <Route path="/video-detail" />
            <Route path="/account" />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
