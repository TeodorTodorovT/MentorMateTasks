import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import ProductTable from "./ProductTable";
import { useDispatch, useSelector } from "react-redux";
import { searchProducts } from "../features/productsSlice";

const FilterableProdcutTable = () => {
  const {products} = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [inStock, setInStock] = useState(false);
  
  const searchProduct = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const showInStock = (e) => {
    setInStock(!inStock);
  };

  useEffect(() => {
    dispatch(searchProducts({searchTerm, inStock}))

  }, [searchTerm, inStock, products]);



  return (
    <>
      <h1>IronStore</h1>
      <SearchBar searchProduct={searchProduct} showInStock={showInStock} />
      <ProductTable/>
    </>
  );
};

export default FilterableProdcutTable;
