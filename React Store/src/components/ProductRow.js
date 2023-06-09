import React from "react";
import { useNavigate } from "react-router-dom";

const ProductRow = ({ product }) => {
  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(`product/${product.id}`);
  };

  return (
    <tr onClick={handleRowClick}>
      <td>{product.name}</td>
      <td>{product.price}</td>
    </tr>
  );
};

export default ProductRow;
