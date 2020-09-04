import React from 'react'
import ApiManager from '../../api/ApiManager'
import '../products/ProductCard.css'

export default function ProductCard(props) {

    const handleDelete = () => {
        ApiManager.deleteProduct(props.productId).then(props.getProducts).then(props.history.push('/products'))
    }

    return (
        <>
            <div className="card home-flex" style={{ "padding" : "20px", "align-items" : "center", "margin" : "10px" }}>
                <div class="card-body">
                <h2><a href={`/products/${props.productId}`}> {props.product.title}</a></h2>
                <p>{props.product.description}</p>
                <p>{props.product.price}</p>
                <p>{props.product.location}</p>
                {props.customer ?
                    < button onClick={handleDelete}>
                        Delete
                </button>
                    : null}
            </div>
            </div>
        </>
    )
}