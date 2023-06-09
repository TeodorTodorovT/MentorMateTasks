import React from 'react'
import ProductRow from './ProductRow';
import { useSelector } from 'react-redux';

const ProductTable = () => {
  const {loading, filteredProducts} = useSelector((state) => state.products);

    if(loading) return(<div>Loading...</div>)

    return (
        <table className='product-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <ProductRow key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      );
}

export default ProductTable