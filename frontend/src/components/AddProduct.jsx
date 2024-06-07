import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AddProduct = ({setAddProduct, addProduct}) => {
  const { userId } = useParams()
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [capacities, setCapacities] = useState([]);
  const [colors, setColors] = useState([]);
  const [versions, setVersions] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedVersion, setSelectedVersion] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [tagCategories, setTagCategories] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    // 获取品牌列表
    axios.get(`${process.env.REACT_APP_API_URL}/brands`)
      .then(response => setBrands(response.data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (selectedBrand) {
      // 根据品牌获取型号列表
      axios.get(`${process.env.REACT_APP_API_URL}/models/brand/${selectedBrand}`)
        .then(response => setModels(response.data))
        .catch(error => console.error(error));
    }
  }, [selectedBrand]);

  useEffect(() => {
    if (selectedModel) {
      // 根据型号获取容量列表
      axios.get(`${process.env.REACT_APP_API_URL}/capacities/model/${selectedModel}`)
        .then(response => setCapacities(response.data))
        .catch(error => console.error(error));
      // 根据型号获取颜色列表
      axios.get(`${process.env.REACT_APP_API_URL}/colors/model/${selectedModel}`)
        .then(response => setColors(response.data))
        .catch(error => console.error(error));
      // 根据型号获取版本列表
      axios.get(`${process.env.REACT_APP_API_URL}/versions/model/${selectedModel}`)
        .then(response => setVersions(response.data))
        .catch(error => console.error(error));
    }
  }, [selectedModel]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/tagCategories`)
      .then(response => setTagCategories(response.data))
      .catch(error => console.error(error));
  }, [])

  const handleSubmit = async (event) => {
    const newProduct = {
      brandId: parseInt(selectedBrand),
      modelId: parseInt(selectedModel),
      capacityId: parseInt(selectedCapacity),
      colorId: parseInt(selectedColor),
      versionId: parseInt(selectedVersion),
      userId: parseInt(userId),
      price: parseInt(price),
      description,
      updatedAt: new Date()
    };

    axios.post(`${process.env.REACT_APP_API_URL}/products`, newProduct)
      .then(response => {
        console.log('Product added:', response.data);
        // 清空表单
        setSelectedBrand('');
        setSelectedModel('');
        setSelectedCapacity('');
        setSelectedColor('');
        setSelectedVersion('');
        setPrice('');
        navigate(`/user-dashboard/${userId}`)
      })
      .catch(error => console.error(error));
    setAddProduct(addProduct+1)
  };

  const handleTagClick = (tagName) => {
    setDescription(prevDescription => prevDescription + tagName);
  }

  return (
    <div>
      <h2>添加商品</h2>
      <>
        <label>品牌:</label>
        <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)}>
          <option value="">选择</option>
          {brands.map(brand => (
            <option key={brand.id} value={brand.id}>{brand.name}</option>
          ))}
        </select>
      </>
      <>
        <label>型号:</label>
        <select value={selectedModel} onChange={(e) => setSelectedModel(e.target.value)}>
          <option value="">选择</option>
          {models.map(model => (
            <option key={model.id} value={model.id}>{model.name}</option>
          ))}
        </select>
      </>
      <>
        <label>容量:</label>
        <select value={selectedCapacity} onChange={(e) => setSelectedCapacity(e.target.value)}>
          <option value="">选择</option>
          {capacities.map(capacity => (
            <option key={capacity.id} value={capacity.id}>{capacity.name}</option>
          ))}
        </select>
      </>
      <>
        <label>颜色:</label>
        <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
          <option value="">选择</option>
          {colors.map(color => (
            <option key={color.id} value={color.id}>{color.name}</option>
          ))}
        </select>
      </>
      <>
        <label>版本:</label>
        <select value={selectedVersion} onChange={(e) => setSelectedVersion(e.target.value)}>
          <option value="">选择</option>
          {versions.map(version => (
            <option key={version.id} value={version.id}>{version.name}</option>
          ))}
        </select>
      </>
      <>
        <label>价格:</label>
        <input
          style={{ width: '60px' }}
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </>
      <div>
        <label>商品描述：</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} style={{ width: "100%", height: "60px" }} type="text" />
      </div>
      <div>
        {tagCategories.map(tagCategory => (
          <div key={tagCategory.id}>
            <span>{tagCategory.name}</span>
            {tagCategory.tags.map(tag => (
              <button key={tag.id} onClick={() => handleTagClick(tag.name)}>{tag.name}</button>
            ))}
          </div>
        ))}
      </div>
      <button onClick={handleSubmit}>添加</button>
    </div>
  );
}

export default AddProduct;
