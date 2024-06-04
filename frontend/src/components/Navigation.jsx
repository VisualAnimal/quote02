// components/Navigation.jsx
import React from 'react';
import { Link, useParams } from 'react-router-dom';

function Navigation() {
  const { userId } = useParams();

  return (
    <nav>
      <ul>
        {/* <li><Link to="/">Home</Link></li> */}
        <li><Link to={`/user-dashboard/${userId}/profile`}>设置</Link></li>
        {/* <li><Link to={`/user-dashboard/${userId}/settings`}>Settings</Link></li> */}
        <li><Link to={`/user-dashboard/${userId}`}>我发布的商品</Link></li>
        <li><Link to={`/user-dashboard/${userId}/followed`}>关注的商家</Link></li>
        <li><Link to={`/user-dashboard/${userId}/preview`}>预览店铺</Link></li>
        <li><Link to={`/user-dashboard/${userId}/addProduct`}>发布商品</Link></li>
      </ul>
    </nav>
  );
}

export default Navigation;
