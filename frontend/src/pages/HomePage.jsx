import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { List } from 'antd-mobile'
import { ListItem } from 'antd-mobile/es/components/list/list-item';

const HomePage = () => {
  const [products, setProducts] = useState([])
  const productsRef = useRef();
  const { userId } = useParams()

  useEffect(() => {
    productsRef.current = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/products/user/${userId}/followed`);
        setProducts(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    productsRef.current()
  }, [])
  return (
    <div>
      <List>
        {products.map(product => (
          product.deactivationTime ? (
            <List.Item extra={
              <del>{`￥${product.price + product.profit} `}</del>
            }
              description={product.description}>
              {`${product.brand.name} `}
              {`${product.model.name} `}
              {`${product.capacity.name} `}
              {`${product.color.name} `}
              {`${product.version.name} `}
            </List.Item>
          ) : (
            <List.Item extra={`￥${product.price + product.profit} `}
              description={product.description}>
              {`${product.brand.name} `}
              {`${product.model.name} `}
              {`${product.capacity.name} `}
              {`${product.color.name} `}
              {`${product.version.name} `}
            </List.Item>
          )
        ))}
      </List>
    </div>
  )
}

export default HomePage