import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Attribute from './Attribute';

const ProductList = ({ addProduct }) => {
    console.log(addProduct)
    const [products, setProducts] = useState([]);
    const { userId } = useParams();
    const productsRef = useRef();
    const [selectedBrand, setSelectedBrand] = useState('')
    const [selectedModel, setSelectedModel] = useState('')

    const handleBrandSelected = (e) => {
        setSelectedBrand(e)
        console.log(e)
    }

    const handleModelSelected = e => {
        setSelectedModel(e)
    }

    useEffect(() => {
        productsRef.current = async () => {
            try {
                // 构建动态 URL
                let url = `${process.env.REACT_APP_API_URL}/products/user/${userId}`;
                const params = [];
                if (selectedBrand) {
                    params.push(`brandId=${selectedBrand}`);
                }
                if (selectedModel) {
                    params.push(`modelId=${selectedModel}`);
                }
                if (params.length > 0) {
                    url += `?${params.join('&')}`;
                }
                console.log(url)
                const response = await axios.get(url);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        productsRef.current();
    }, [selectedBrand, selectedModel, addProduct]);

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
            <h2>商品列表</h2>
            <Attribute
                brandSelected={handleBrandSelected}
                modelSelected={handleModelSelected}
            />
            <ul>
                {products.length ? (
                    products.map(product => (
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
                    ))
                ) : `没有商品`}
            </ul>
        </div>
    );
}

export default ProductList;
