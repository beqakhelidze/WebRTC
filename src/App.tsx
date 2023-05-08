import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import Home from './pages/home';
import WebRTC from './pages/webRTC';

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/:isVideoEnabled" element={<WebRTC />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
