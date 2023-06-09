import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createPortal } from 'react-dom';
import { useSelector } from "react-redux";
import ProductCard from './ProductCard';


const ProductDetailsModal = () => {
  const {filteredProducts} = useSelector((state) => state.products);
  

    let {id} = useParams();
    const [product, setProduct] = useState({});
    useEffect(()=>{
        let currentProduct = filteredProducts.filter(obj => {
            return obj.id === id;
        })
        setProduct(currentProduct[0]);
    }, [filteredProducts])



  return ( createPortal(
    <ProductCard product={product}/>, document.getElementById("portal"))
  )
}

export default ProductDetailsModal