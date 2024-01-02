import React, { useState, useContext, useEffect } from "react";
import ProductCard from "./ProductCard";
import ReactPaginate from "react-paginate";
import "./styles/ProductList.css";
// import products from "../assets/dummyData.js";

const ProductList = () => {
  const calculatePerPage = () => {
    const productsPerRow = Math.floor(window.innerWidth / 310);
    return productsPerRow * 5;
  };

  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(calculatePerPage());

  useEffect(() => {
    const handleResize = () => {
      setPerPage(calculatePerPage());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  let [products, setProducts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/wines", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    let data = await response.json();

    if (response.status === 200) {
      // Temporary solution to match previously used format of wines
      setProducts(
        data.map((wine) => {
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
            amount: wine.units_in_stock,
            year: wine.year,
          };
        })
      );
    } else {
      console.log("Error");
    }
  };

  const offset = currentPage * perPage;
  const currentPageData = products.slice(offset, offset + perPage);

  return (
    <div>
      <div className="product-list">
        {currentPageData.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      <div className="pagination-container">
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
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
