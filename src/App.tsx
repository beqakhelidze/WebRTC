import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import Header from './components/header';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Register from './pages/register';
import WebRTC from './pages/webRTC';

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path="/:isVideoEnabled" element={<WebRTC />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
