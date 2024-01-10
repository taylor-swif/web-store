import { useState, useEffect } from "react";
import SingleFilter from "./SingleFilter";
import FilterSort from "./FilterSort";
import FilterRating from "./FilterRating";

const fetchFilterOptions = async (url, onDataFetched) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      onDataFetched(data);
    } else {
      console.error(`Failed to fetch data from ${url}`);
    }
  } catch (error) {
    console.error(`Error while fetching data from ${url}:`, error);
  }
};

const Filters = ({
  filters,
  onFilterChange,
  onSortChange,
  sortingOption,
  onRatingChange,
}) => {
  const [countries, setCountries] = useState([]);

  const handleCountriesFetched = (data) => {
    const countryNames = data.map((country) => country.name);
    setCountries(countryNames);
  };

  useEffect(() => {
    fetchFilterOptions(
      "http://127.0.0.1:8000/api/countries",
      handleCountriesFetched
    );
  }, []);

  const [tastes, setTastes] = useState([]);

  const handleTastesFetched = (data) => {
    const tasteNames = data.map((taste) => taste.taste);
    setTastes(tasteNames);
  };

  useEffect(() => {
    fetchFilterOptions(
      "http://127.0.0.1:8000/api/wine_tastes",
      handleTastesFetched
    );
  }, []);

  const alcohols = ["13.0", "2"];
  const volumes = ["1", "2"];
  const vintages = [2023, 2022, 2021];

  const SortingOptions = [
    "Price: Lowest first",
    "Price: Highest first",
    "Highest rated",
  ];

  //Powpisywalem tu do testowania cssa te wartosci, ale docelowo imo
  //trzeba uzyc contextu winesAttributes w ktorym sa wszystkie mozliwe dane o winach
  //taka tablica setów i tu z contextu pouzupelniac te filtry

  return (
    <div className="filters-container">
      <FilterSort
        sortingOptions={SortingOptions}
        selectedOption={sortingOption}
        onSortChange={onSortChange}
      />
      <FilterRating onRatingChange={onRatingChange} />
      <SingleFilter
        filter={"country"}
        filterName={"Countries"}
        options={countries}
        filters={filters}
        onFilterChange={onFilterChange}
      />
      <SingleFilter
        filter={"taste"}
        filterName={"Tastes"}
        options={tastes}
        filters={filters}
        onFilterChange={onFilterChange}
      />
      <SingleFilter
        filter={"alcohol"}
        filterName={"Alcohol"}
        options={alcohols}
        filters={filters}
        onFilterChange={onFilterChange}
      />
      <SingleFilter
        filter={"volume"}
        filterName={"Volume"}
        options={volumes}
        filters={filters}
        onFilterChange={onFilterChange}
      />
      <SingleFilter
        filter={"vintage"}
        filterName={"Vintage"}
        options={vintages}
        filters={filters}
        onFilterChange={onFilterChange}
      />
    </div>
  );
};

export default Filters;
