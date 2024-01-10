import SingleFilter from "./SingleFilter";
import FilterSort from "./FilterSort";
import FilterRating from "./FilterRating";

const Filters = ({
  filters,
  onFilterChange,
  onSortChange,
  sortingOption,
  onRatingChange,
}) => {
  const countries = [
    "Argentina",
    "Australia",
    "Brazil",
    "Chile",
    "China",
    "Germany",
    "Spain",
    "France",
    "Italy",
    "New Zealand",
    "Portugal",
    "Romania",
    "Russia",
    "United States",
    "South Africa",
    "Poland",
    "Hungary",
    "Austria",
  ];

  const tastes = [
    "Dry",
    "Sweet",
    "Oaked",
    "Semi-sweet",
    "Extra Dry",
    "Semi-dry",
    "Brut",
  ];

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
