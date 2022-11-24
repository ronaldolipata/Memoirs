import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';
import UserProfile from '@/components/UserProfile';
import UserContextComponent from '@/UserContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserContextComponent>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/:username" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </UserContextComponent>
);
