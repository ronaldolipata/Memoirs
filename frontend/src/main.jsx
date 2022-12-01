import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import '@/index.css';

const UserContextComponent = lazy(() => import('@/UserContext'));
const App = lazy(() => import('@/components/App'));
const Register = lazy(() => import('@/components/Register'));
const Login = lazy(() => import('@/components/Login'));
const UserProfile = lazy(() => import('@/components/UserProfile'));
const UpdateProfile = lazy(() => import('@/components/UpdateProfile'));
const CreatePost = lazy(() => import('@/components/CreatePost'));
const ViewPost = lazy(() => import('@/components/ViewPost'));
const UpdatePost = lazy(() => import('@/components/UpdatePost'));

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserContextComponent>
    <React.StrictMode>
      <BrowserRouter>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/:usernameParams" element={<UserProfile />} />
            <Route path="/:usernameParams/update" element={<UpdateProfile />} />
            <Route path="/:usernameParams/post" element={<CreatePost />} />
            <Route
              path="/:usernameParams/post/:postId"
              element={<ViewPost />}
            />
            <Route
              path="/:usernameParams/post/:postId/update"
              element={<UpdatePost />}
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </React.StrictMode>
  </UserContextComponent>
);
