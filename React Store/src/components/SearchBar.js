import React from 'react'

const SearchBar = ({searchProduct, showInStock}) => {


    return (
        <div className="search-box">
          <label htmlFor="search">Search</label>
          <input type="text" name="search" id="search" onChange={searchProduct}/>
          <div className="checkbox">
            <input type="checkbox" name="in-stock" id="in-stock" onChange={showInStock}/>
            <label htmlFor="in-stock">Only show products in stock</label>
          </div>
        </div>
      )
}

export default SearchBar