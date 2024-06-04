// pages/UserDashboard.jsx
import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import Navigation from '../components/Navigation';

function UserDashboard() {
  const { userId } = useParams();
  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
}

export default UserDashboard;
