import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Preview = () => {
  const [products, setProducts] = useState([])
  const { userId } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/products/user/${userId}/followed`)
      const followedProducts = response.data
      setProducts(followedProducts)
    }
    fetchData()
  }, [])
  return (
    <div>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {`${product.brand.name} `}
            {`${product.model.name} `}
            {`${product.capacity.name} `}
            {`${product.color.name} `}
            {`${product.version.name} `}
            {`${product.price + product.profit} `}
            <ul>
              <li>来自：{`${product.user.name} `}</li>
              <li>同行价：{`${product.price} `}</li>
              <li>加价：{`${product.profit}`}</li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Preview