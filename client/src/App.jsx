import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import SNS from './pages/SNS';
import Create from './pages/Create';
import MainLayout from './layouts/main/Main';
import Video from './pages/Video';
import Account from './pages/Account';
import CreateView from './pages/CreateView';
import VideoDetail from './pages/VideoDetail';
import PrivateRoute from './components/PrivateRoute';
import CreateScript from './pages/CreateScript';

const NotFound = () => {
  return <h1>404 Not Found</h1>;
};

const App = () => {
  return (
    <Router>
      <div className="app-container">
        {/* ToastContainer */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Routes>
          <Route path="/" element={<Navigate to="/create-script" replace />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/sns"
            element={
              <PrivateRoute>
                <SNS />
              </PrivateRoute>
            }
          />
          <Route
            element={
              <PrivateRoute>
                <MainLayout />
              </PrivateRoute>
            }
          >
            <Route path="/create-script" element={<CreateScript />} />
            <Route path="/create-video" element={<Create />} />
            <Route path="/create-view" element={<CreateView />} />
            <Route path="/video" element={<Video />} />
            <Route path="/video-detail" element={<VideoDetail />} />
            <Route path="/account" element={<Account />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
