import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);
    const { userId } = useParams();
    const productsRef = useRef();

    useEffect(() => {
        productsRef.current = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/products/user/${userId}`);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        productsRef.current();
    }, []);

    const handleDelete = (productId) => {
        axios.delete(`${process.env.REACT_APP_API_URL}/products/${productId}`)
            .then(response => {
                console.log('Product deleted:', response.data);
                productsRef.current(); // 删除成功后重新获取产品列表
            })
            .catch(error => console.error('Error deleting product:', error));
    };

    const handleRefresh = (productId) => {
        axios.put(`${process.env.REACT_APP_API_URL}/products/${productId}/refresh`)
            .then(response => {
                console.log('Product refreshed:', response.data);
                productsRef.current(); // 刷新成功后重新获取产品列表
            })
            .catch(error => console.error('Error refreshing product:', error));
    };

    return (
        <div>
            <h2>Products</h2>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        {`${product.brand.name} `}
                        {`${product.model.name} `}
                        {`${product.capacity.name} `}
                        {`${product.color.name} `}
                        {`${product.version.name} `}
                        {`￥${product.price}`}
                        <button onClick={() => handleDelete(product.id)}>删除</button>
                        <button onClick={() => handleRefresh(product.id)}>擦亮</button>
                        <ul>
                            <li>{product.description}</li>
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Products;
