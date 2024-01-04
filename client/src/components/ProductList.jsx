import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "./ProductCard";
import ReactPaginate from "react-paginate";
import Filters from "./Filters";
import "./styles/ProductList.css";

const ProductList = ({ products }) => {
  const calculatePerPage = () => {
    const productsPerRow = Math.floor(window.innerWidth / 310);
    return productsPerRow * 5;
  };

  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(calculatePerPage());
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPageData, setCurrentPageData] = useState([]);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search") || "";
  const filteredData = searchTerm
    ? filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;

  useEffect(() => {
    setFilteredProducts(filteredData);
  }, [filteredData]);

  useEffect(() => {
    setFilteredProducts(filteredData);
  }, [filteredData]);

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

  const [filters, setFilters] = useState({
    country: [],
    taste: [],
    alcohol: [],
    volume: [],
    vintage: [],
  });

  const handleFilterChange = (filter, option) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };

      if (updatedFilters[filter].includes(option)) {
        updatedFilters[filter] = updatedFilters[filter].filter(
          (item) => item !== option
        );
      } else {
        updatedFilters[filter] = [...updatedFilters[filter], option];
      }

      return updatedFilters;
    });
  };

  const applyFilters = () => {
    const filterAppliedData = filteredData.filter((product) => {
      if (
        filters.country.length > 0 &&
        !filters.country.includes(product.country)
      ) {
        return false;
      }

      if (filters.taste.length > 0 && !filters.taste.includes(product.taste)) {
        return false;
      }

      if (
        filters.alcohol.length > 0 &&
        !filters.alcohol.includes(product.alcohol)
      ) {
        return false;
      }

      if (
        filters.volume.length > 0 &&
        !filters.volume.includes(product.volume)
      ) {
        return false;
      }

      if (
        filters.vintage.length > 0 &&
        !filters.vintage.includes(product.vintage)
      ) {
        return false;
      }

      return true;
    });

    setFilteredProducts(filterAppliedData);
  };

  useEffect(() => {
    applyFilters();
  }, [filters, filteredData]);

  useEffect(() => {
    setCurrentPageData(filteredProducts.slice(offset, offset + perPage));
  }, [filteredProducts, offset, perPage]);

  return (
    <>
      {filteredData.length === 0 ? (
        <div className="empty-data-div">
          <img src="/src/assets/no-items-found.jpg" alt="No Items Found" />
        </div>
      ) : (
        <div className="product-list-container">
          <div className="filters-wrapper">
            <Filters filters={filters} onFilterChange={handleFilterChange} />
          </div>
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
