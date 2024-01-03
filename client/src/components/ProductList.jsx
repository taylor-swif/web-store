import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import ReactPaginate from "react-paginate";
import "./styles/ProductList.css";

const ProductList = ({ products }) => {
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

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    scrollToTop();
  }, [currentPage]);

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
