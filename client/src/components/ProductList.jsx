import React, { useState, useContext, useEffect } from "react";
import ProductCard from "./ProductCard";
import ReactPaginate from "react-paginate";
import "./ProductList.css";
import AuthContext from "../context/AuthContext";
// import products from "../assets/dummyData.js";

const perPage = 15;

const ProductList = ({ onAddToCart }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const { authTokens, logoutUser } = useContext(AuthContext);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  let [products, setProducts] = useState([])

  useEffect(() => {
      getProducts()
  },[])

  const getProducts = async() => {
    let response = await fetch('http://127.0.0.1:8000/api/wines', {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json'
      }
    })

    let data = await response.json()
    
    if (response.status === 200) {
      setProducts(data.map((wine) => {
        return {
          name: wine.name,
          type: wine.taste.taste + "/" + wine.color.color,
          country: wine.country.name,
          description: wine.description,
          id: wine.id,
          imageUrl: wine.image_url,
          price: wine.price,
          rating: wine.rating,
          inStock: wine.units_in_stock > 0,
          year: wine.year
        }
      }))
    } else {
      console.log('Error')
      //logoutUser()
    }
  }

  const offset = currentPage * perPage;
  const currentPageData = products.slice(offset, offset + perPage);
  console.log(currentPageData);

  return (
    <div>
      <div className="product-list">
        {currentPageData.map((product, index) => (
          <ProductCard
            key={index}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
      <div className="pagination-container">
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          pageCount={Math.ceil(products.length / perPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
};

export default ProductList;
