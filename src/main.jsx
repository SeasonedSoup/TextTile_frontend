import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router';
import './index.css';
import App from './App.jsx';
import Profile from './components/UpdateProfile.jsx';
import ProfileDetails from './components/ProfileDetails.jsx';
import { AuthProvider } from './components/AuthToken/AuthProvider.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: '/profile',
    element: <Profile/>
  },
  {
    path: '/:username/profile',
    element: <ProfileDetails/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
