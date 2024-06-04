import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserDashboard from './pages/UserDashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Products from './pages/Products';
import Preview from './pages/Preview'
import Followed from './pages/Followed'
import AddProduct from './pages/AddProduct'

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
        element: <Products />,
      },
      {
        path: "preview",
        element: <Preview />,
      },
      {
        path: "followed",
        element: <Followed />,
      },
      {
        path: "addProduct",
        element: <AddProduct />,
      },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
