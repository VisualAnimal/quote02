import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { List } from 'antd-mobile'
import { ListItem } from 'antd-mobile/es/components/list/list-item';
import Attribute from '../components/Attribute';

const HomePage = () => {
  const [products, setProducts] = useState([])
  const productsRef = useRef();
  const { userId } = useParams()
  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedModel, setSelectedModel] = useState('')
  const [selectedCapacity, setSelectedCapacity] = useState('')

  const handleBrandSelected = (e) => {
    setSelectedBrand(e)
  }

  const handleModelSelected = e => {
    setSelectedModel(e)
  }

  const handleCapacitySelected = e => {
    setSelectedCapacity(e)
  }

  useEffect(() => {
    productsRef.current = async () => {
      try {
        // 构建动态 URL
        let url = `${process.env.REACT_APP_API_URL}/products/user/${userId}/followed`;
        const params = [];
        if (selectedBrand) {
          params.push(`brandId=${selectedBrand}`);
        }
        if (selectedModel) {
          params.push(`modelId=${selectedModel}`);
        }
        if (selectedCapacity) {
          params.push(`capacityId=${selectedCapacity}`)
        }
        if (params.length > 0) {
          url += `?${params.join('&')}`;
        }
        const response = await axios.get(url);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    productsRef.current()
  }, [selectedBrand, selectedModel, selectedCapacity])


  return (
    <div>
      <Attribute
        brandSelected={handleBrandSelected}
        modelSelected={handleModelSelected}
        capacitySelected={handleCapacitySelected}
        userId={userId}
      />
      <List>
        {products.length ? (
          products.map(product => (
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
          ))
        ) : (
          <span>没有商品</span>
        )}
      </List>
    </div>
  )
}

export default HomePage