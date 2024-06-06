import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Attribute = ({ brandSelected, modelSelected }) => {
    const [attributes, setAttributes] = useState([])
    const [brand, setBrand] = useState(0)
    const [model, setModel] = useState(0)

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/attributes`).then(response => {
            setAttributes(response.data)
        })
    }, [])

    const handleBrandChange = (e) => {
        setBrand(e.target.value)
        brandSelected(e.target.value)
    }

    const handleModelChange = (e) => {
        setModel(e.target.value)
        modelSelected(e.target.value)
    }

    const handleReset = () => {
        setBrand(0)
        brandSelected(0)
        setModel(0)
        modelSelected(0)
    }

    return (
        <div>
            <span>筛选：</span>
            <select id="brand-select" value={brand} onChange={handleBrandChange}>
                <option value="">品牌</option>
                {attributes.map(attribute => (
                    <option key={attribute.id} value={attribute.id}>
                        {attribute.name}
                    </option>
                ))}
            </select>
            {brand ? (
                <select value={model} onChange={handleModelChange}>
                    <option value="">型号</option>
                    {
                        attributes[brand - 1].models.map(model => (

                            <option key={model.id} value={model.id}>
                                {model.name}
                            </option>
                        ))
                    }

                </select>
            ) : ''}
            {brand ? (
                <button onClick={handleReset}>重置筛选</button>
            ) : ''}
        </div>
    )
}

export default Attribute
