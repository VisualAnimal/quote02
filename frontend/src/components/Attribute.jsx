import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Attribute = ({ brandSelected, modelSelected, capacitySelected, userId }) => {
    // console.log(userId)
    const [attributes, setAttributes] = useState([])
    const [brand, setBrand] = useState(0)
    const [model, setModel] = useState(0)
    const [capacity, setCapacity] = useState(0)
    const [followedUserIds, setFollowedUserIds] = useState([])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/follows/${userId}`).then(response => {
            const followedUserIds = response.data.map(follow => follow.followedUserId)
            console.log(followedUserIds)
            setFollowedUserIds(followedUserIds)

        })
    }, [])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/attributes`, { params: { ids: followedUserIds } }).then(response => {
            setAttributes(response.data)
            // console.log(response.data)
        })
    }, [followedUserIds])

    const handleBrandChange = (e) => {
        setBrand(e.target.value)
        setModel('')
        setCapacity('')
        brandSelected(e.target.value)
        modelSelected('')
        capacitySelected('')
    }

    const handleModelChange = (e) => {
        setModel(e.target.value)
        modelSelected(e.target.value)
        setCapacity('')
        capacitySelected('')

    }

    const handleCapacityChange = (e) => {
        setCapacity(e.target.value)
        capacitySelected(e.target.value)
    }

    const handleReset = () => {
        setBrand(0)
        brandSelected(0)
        setModel(0)
        modelSelected(0)
        setCapacity(0)
        capacitySelected(0)
    }

    return (
        <div>
            <span>品牌：</span>
            <select id="brand-select" value={brand} onChange={handleBrandChange}>
                <option value="">不限</option>
                {attributes.map(attribute => (
                    <option key={attribute.id} value={attribute.id}>
                        {attribute._count.products ? (
                            `${attribute.name} - ${attribute._count.products}台`
                        ) : (
                            `${attribute.name} - 缺货`
                        )}
                    </option>
                ))}
            </select>
            {brand ? (
                <>
                    <span>型号：</span>
                    <select value={model} onChange={handleModelChange}>
                        <option value="">不限</option>
                        {
                            attributes[brand - 1].models.map(model => (

                                <option key={model.id} value={model.id}>
                                    {model._count.products ? (
                                        `${model.name} - ${model._count.products}台`
                                    ) : (
                                        `${model.name} - 缺货`
                                    )}
                                </option>
                            ))
                        }
                    </select>

                </>
            ) : ''}
            {model ? (
                <>
                    <span>容量：</span>
                    <select value={capacity} onChange={handleCapacityChange}>
                        <option value="">不限</option>
                        {
                            attributes[brand - 1].models[model - 1].capacities.map(capacity => (

                                <option key={capacity.id} value={capacity.id}>
                                    {capacity._count.products ? (
                                        `${capacity.name} - ${capacity._count.products}台`
                                    ) : (
                                        `${capacity.name} - 缺货`
                                    )}
                                </option>
                            ))
                        }

                    </select>

                </>
            ) : ''}
            {brand ? (
                <button onClick={handleReset}>重置筛选</button>
            ) : ''}
        </div>
    )
}

export default Attribute
