import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';
import UserContextComponent from '@/UserContext';
import Login from '@/components/Login';
import UserProfile from '@/components/UserProfile';
import Post from '@/components/Post';

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserContextComponent>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/:username" element={<UserProfile />} />
          <Route path="/:username/post" element={<Post />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </UserContextComponent>
);
