import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

const Admin = () => {
    const [products, setProducts] = useState([])
    const productsRef = useRef()

    useEffect(() => {
        productsRef.current = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/products`)
                setProducts(response.data)
            } catch (error) {

            }
        }
        productsRef.current()
    }, [])

    const handleDelete = async (id) => {
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/products/${id}`)
        productsRef.current()
    }

    return (
        <div>
            <ul>
                {products.map(product => (
                    <li>
                        {`${product.brand.name} `}
                        {`${product.model.name} `}
                        {`${product.capacity.name} `}
                        {`${product.color.name} `}
                        {`${product.version.name} `}
                        {`￥${product.price} `}
                        {`${product.user.name}`}
                        <button onClick={() => handleDelete(product.id)}>删除</button>
                        <ul>
                            <li>
                                {`${product.description} `}
                            </li>
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Admin