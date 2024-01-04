import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
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
  const [filteredProducts, setFilteredProducts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

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

  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search") || "";
  const filteredData = searchTerm
    ? filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;

  const currentPageData = filteredData.slice(offset, offset + perPage);

  return (
    <>
      {filteredData.length === 0 ? (
        <div className="empty-data-div">
          <img src="/src/assets/no-items-found.jpg" alt="No Items Found" />
        </div>
      ) : (
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
              pageCount={Math.ceil(filteredData.length / perPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductList;
