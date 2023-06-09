import React from 'react'
import { useNavigate } from 'react-router-dom'

const ProductCard = ({product}) => {
    let navigate = useNavigate();
    const closeHandler = (e) =>{      
        navigate("/");
      }
  return (
    <>
        <div className='modal-overlay' onClick={closeHandler} />
        <div className='modal'>
            <h2>More details</h2>
            <p>Name: <b>{product?.name}</b></p>
            <p>Category: <b>{product?.category}</b></p>
            <p>Price: <b>{product?.price}</b></p>
            <p>Availability: <b>{product?.inStock ? "yes" : "no"}</b></p>
            <button className='close-button' onClick={closeHandler}>Close</button>
        </div>
      </>
  )
}

export default ProductCard