import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserDashboard from './pages/UserDashboard';
import Profile from './pages/Profile';
import Preview from './pages/Preview'
import Product from './pages/Product';
import User from './pages/User';
import Admin from './pages/Admin';

const router = createBrowserRouter([
  {
    path: "/:userId",
    element: <HomePage />,
  },
  {
    path: "/user-dashboard/:userId",
    element: <UserDashboard />,
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
      // {
      //   path: "settings",
      //   element: <Settings />,
      // },
      {
        // path: "products",
        index: true,
        element: <Product />,
      },
      {
        path: "preview",
        element: <Preview />,
      },
      {
        path: "user",
        element: <User />,
      },
    ],
  },
  {
    path: "/admin",
    element: <Admin />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
