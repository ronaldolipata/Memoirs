import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from '@/components/App';
import '@/index.css';
import UserContextComponent from '@/UserContext';
import Login from '@/components/Login';
import Register from '@/components/Register';
import UserProfile from '@/components/UserProfile';
import CreatePost from '@/components/CreatePost';
import ViewPost from '@/components/ViewPost';
import UpdatePost from '@/components/UpdatePost';

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserContextComponent>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/:usernameParams" element={<UserProfile />} />
          <Route path="/:usernameParams/post" element={<CreatePost />} />
          <Route path="/:usernameParams/post/:postId" element={<ViewPost />} />
          <Route
            path="/:username/post/:postId/update"
            element={<UpdatePost />}
          />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </UserContextComponent>
);
