import React, { useState } from 'react'
import ProductList from '../components/ProductList'
import AddProduct from '../components/AddProduct'

const Product = () => {
  const [addProduct, setAddProduct] = useState(1)
  return (
    <div>
      <AddProduct setAddProduct={setAddProduct} addProduct={addProduct} />
      <ProductList addProduct={addProduct} />
    </div>
  )
}

export default Product