import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Followed = () => {
  const [follows, setFollows] = useState([]);
  const { userId } = useParams()

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/users/${userId}`) // 根据你的API地址进行修改
      .then(response => {
        setFollows(response.data.following)
        console.log(response.data.following)
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  return (
    <div>
      <ul>
        {follows.map(follow => (
          <li key={follow.id}>
            {`${follow.followedUser.name} - `}
            {`发布的商品：${follow.followedUser._count.products}件 - `}
            {`加价：${follow.profit} `}


            {/* {`${follow.model.name} `}
            {`${follow.capacity.name} `}
            {`${follow.color.name} `}
            {`${follow.version.name} `}
            {`￥${follow.price}`}
            { } */}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Followed 