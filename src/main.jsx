import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router';
import './index.css';
import App from './App.jsx';
import Dashboard from './Dashboard.jsx';
import Profile from './Profile.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/TextTile-Dashboard",
    element: <Dashboard/>
  },
  {
    path: '/profile',
    element: <Profile/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
