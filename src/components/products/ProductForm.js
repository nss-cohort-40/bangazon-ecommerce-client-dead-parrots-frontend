import React, { useState, useEffect, useRef } from 'react'
import ApiManager from '../../api/ApiManager'

export default function ProductForm(props) {

    const title = useRef()
    const price = useRef()
    const description = useRef()
    const location = useRef()
    const quantity = useRef()
    const [checked, setChecked] = useState(false)
    const [customer, setCustomer] = useState({ user: {} })
    const [productTypeId, setProductTypeId] = useState({ product_type_id: "" })
    const [productTypes, setProductTypes] = useState([])
    const [isValid, setIsValid] = useState(false)
    const [image, setImage] = useState('')
    const handleClick = () => setChecked(!checked)

    const getCustomer = () => {
        ApiManager.getCurrentCustomer()
            .then((customer) => {
                setCustomer(customer[0])
            })
    }

    const handleProductTypeChange = (event) => {
        const stateToChange = { ...productTypeId }
        stateToChange[event.target.id] = event.target.value
        const productType = productTypes.filter(productType => productType.name === stateToChange[event.target.id])
        stateToChange.product_type_id = productType[0].id
        setProductTypeId(stateToChange)
        setIsValid(true)
    }

    const uploadImage = async event => {
        console.log('hello')
        const files = event.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'productImage')
        console.log(files[0])
        const res = await fetch('https://api.cloudinary.com/v1_1/dbjxqdddk/image/upload',
          {
            method: 'POST',
            body: data
          }
        )
        const file = await res.json()
        setImage(file.secure_url)
        console.log('image', file.secure_url)
      }

    const onSubmitHandler = (e) => {
        const date = new Date()
        console.log(image)
        if (isValid) {
            const product = {
                title: title.current.value,
                price: price.current.value,
                description: description.current.value,
                quantity: quantity.current.value,
                location: location.current.value,
                image_path: image,
                product_type_id: productTypeId.product_type_id,
                created_at: date,
                local_delivery: checked

            }
            ApiManager.postNewProduct(product).then(e => {

            })
            props.history.push("/products")
        } else {
            e.preventDefault()
            alert("Please select product category!")
        }

    }

    const getProductTypes = () => {
        ApiManager.getProductTypes().then(productTypes => {
            setProductTypes(productTypes)
        })
    }

    useEffect(getCustomer, [])

    useEffect(getProductTypes, [])

    return (

        <main style={{ textAlign: "center" }}>
            <form className="form--login">
                <h1 className="h3 mb-3 font-weight-normal">Sell Product!</h1>
                <fieldset>
                    <label htmlFor="title"> title </label>
                    <input ref={title} type="text"
                        name="title"
                        className="form-control"
                        placeholder="title"
                        required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="price"> Price </label>
                    <input ref={price} type="number"
                        name="price"
                        className="form-control"
                        placeholder="price"
                        required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="description"> Description </label>
                    <input ref={description} type="text"
                        name="description"
                        className="form-control"
                        placeholder="description"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="quantity"> Quantity </label>
                    <input ref={quantity} type="number"
                        name="quantity"
                        className="form-control"
                        placeholder="quantity"
                        required />
                </fieldset>
                <fieldset>
                    <label htmlFor="location"> Location </label>
                    <input ref={location} type="text"
                        name="location"
                        className="form-control"
                        required />
                </fieldset>
                <fieldset>
                <label className="labelFile" htmlFor="file"> Product Image
                    <input 
                        id="file" 
                        type="file"
                        name="file"
                        className="form-control"
                        onChange={uploadImage}
                    />
                 </label>
                </fieldset>
                <fieldset>
                    <label htmlFor="localDelivery"> Local Delivery</label>
                    <input onChange={handleClick} type="checkbox"
                        checked={checked}
                        name="localDelivery"
                        className="form-control"
                        placeholder="localDelivery"
                    />
                </fieldset>
                <fieldset>
                    <select required onChange={handleProductTypeChange} id="productTypeId">
                        <option>Select Product Type</option>
                        {productTypes.map(productType => <option key={productType.id}>{productType.name}</option>)}
                    </select>
                </fieldset>
                <fieldset>
                    <button type="button" onClick={onSubmitHandler}>
                        Sell Product
                    </button>
                </fieldset>
            </form>
        </main>

    )
}
