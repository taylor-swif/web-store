import React, {useState} from "react";
import ProductCard from './ProductCard';
import ReactPaginate from "react-paginate";
import './ProductList.css';
import products from '../assets/dummyData.js'

const perPage = 15;

const ProductList = ({ onAddToCart }) => {
    const [currentPage, setCurrentPage] = useState(0);

    const handlePageClick = ({ selected }) => {
      setCurrentPage(selected);
    };

    const offset = currentPage * perPage;
    const currentPageData = products.slice(offset, offset + perPage);

    return (
      <div>
        <div className="product-list">
          {currentPageData.map((product, index) => (
            <ProductCard key={index} product={product} onAddToCart={onAddToCart} />
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