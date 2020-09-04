import React from 'react';
import { RouteComponentProps } from "react-router-dom";
 
export default function ProductSearch(props) {

  return (
            <div>
                <h2><a href={`/products/${props.product.id}`}> {props.product.title}</a></h2>
                <p>{props.product.description}</p>
                <p>{props.product.price}</p>
                <p>{props.product.location}</p>
                <p>{props.product.imagePath}</p>
            </div>  
  )
}