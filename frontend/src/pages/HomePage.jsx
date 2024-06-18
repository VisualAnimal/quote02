import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Image, InfiniteScroll, List } from 'antd-mobile'
import Attribute from '../components/Attribute';

const HomePage = () => {
  const [products, setProducts] = useState([])
  const productsRef = useRef();
  const { userId } = useParams()
  const [selectedBrand, setSelectedBrand] = useState('')
  const [selectedModel, setSelectedModel] = useState('')
  const [selectedCapacity, setSelectedCapacity] = useState('')
  const [followedUsers, setFollowedUsers] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const size = 20

  const handleBrandSelected = (e) => {
    setSelectedBrand(e)
  }

  const handleModelSelected = e => {
    setSelectedModel(e)
  }

  const handleCapacitySelected = e => {
    setSelectedCapacity(e)
  }

  const handleLoadMore = e => {
    setPage(prev => prev + 1)
    // productsRef.current()
  }

  useEffect(() => {
    productsRef.current = async () => {
      try {
        // 构建动态 URL
        let url = `${process.env.REACT_APP_API_URL}/products/user/${userId}/followed?page=${page}&pageSize=${size}`;
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
        setProducts(prev => [...prev, ...response.data]);
        setHasMore(response.data.length > 0);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    productsRef.current()
  }, [selectedBrand, selectedModel, selectedCapacity, page])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/follows/${userId}`).then(response => {
      const followedUserIds = response.data.map(follow => follow.followedUserId)
      // console.log(followedUserIds)
      setFollowedUsers(followedUserIds)
    })
  }, [])


  return (
    <div>
      {followedUsers.length > 0 ? (
        <Attribute
          brandSelected={handleBrandSelected}
          modelSelected={handleModelSelected}
          capacitySelected={handleCapacitySelected}
          ids={followedUsers}
        />
      ) : (<div>加载中...</div>)}
      <List>

        {products.length ? (
          products.map(product => (
            product.deactivationTime ? (
              <List.Item key={product.id} extra={
                <>
                  <del style={{ color: "#e2e2e2" }}>{`￥${product.price + product.profit} `}</del>
                </>
              }
                prefix={
                  <div style={{ opacity: "0.3" }}>
                    <Image
                      src={product.color.image}
                      fit='scale-down'
                      width={62}
                      height={62}
                    />
                  </div>
                }
                description={<span style={{ color: "#e2e2e2" }}>{product.description}</span>}>
                <div style={{ color: "#e2e2e2" }}>
                  {`${product.brand.name} `}
                  {`${product.model.name} `}
                  {`${product.capacity.name} `}
                  {`${product.color.name} `}
                  {`${product.version.name} `}
                  {` - 已出售`}
                </div>
              </List.Item>
            ) : (
              <List.Item key={product.id} extra={`￥${product.price + product.profit}`}
                prefix={
                  <Image
                    src={product.color.image}

                    // style={{ borderRadius: 20 }}
                    fit='scale-down'
                    width={62}
                    height={62}
                  />
                }
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
      {/* <button onClick={handleLoadMore}>加载更多</button> */}
      <InfiniteScroll hasMore={hasMore} loadMore={handleLoadMore} />
    </div>
  )
}

export default HomePage