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

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search") || "";

  const [currentPage, setCurrentPage] = useState(0);
  const [perPage, setPerPage] = useState(calculatePerPage());
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [currentPageData, setCurrentPageData] = useState([]);

  useEffect(() => {
    applyFilters();
  }, []);

  //const originalProducts = products; //czytaj nizej

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
    let filteredData = products;
    //let filteredData = originalProducts; //zamienic to z tym u gory jakby sie pojawily problemy ale nie powinny i odkomentowac u gory

    filteredData = searchTerm
      ? filteredData.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : filteredData;

    filteredData = filteredData.filter((product) => {
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

    setFilteredProducts(filteredData);
  };

  useEffect(() => {
    applyFilters();
  }, [filters, searchTerm]);

  useEffect(() => {
    setCurrentPageData(filteredProducts.slice(offset, offset + perPage));
  }, [filteredProducts, offset, perPage]);

  return (
    <>
      <div className="product-list-container">
        <div className="filters-wrapper">
          <Filters filters={filters} onFilterChange={handleFilterChange} />
        </div>
        {filteredProducts.length == 0 ? (
          <div className="product-list">
            <img src="/src/assets/no-items-found.jpg" alt="No Items Found" />
          </div>
        ) : (
          <div className="product-list">
            {currentPageData.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        )}

        {filteredProducts.length != 0 && (
          <div className="pagination-container">
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              pageCount={Math.ceil(filteredProducts.length / perPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ProductList;
