import SingleFilter from "./SingleFilter";

const Filters = ({ filters, onFilterChange }) => {
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
  const vintages = ["1", "2"];

  //Powpisywalem tu do testowania cssa te wartosci, ale docelowo imo
  //trzeba uzyc contextu winesAttributes w ktorym sa wszystkie mozliwe dane o winach
  //taka tablica setów i tu z contextu pouzupelniac te filtry

  return (
    <div className="filters-container">
      <h1>Filters</h1>
      <SingleFilter
        filter={"country"}
        options={countries}
        filters={filters}
        onFilterChange={onFilterChange}
      />
      <SingleFilter
        filter={"taste"}
        options={tastes}
        filters={filters}
        onFilterChange={onFilterChange}
      />
      <SingleFilter
        filter={"alcohol"}
        options={alcohols}
        filters={filters}
        onFilterChange={onFilterChange}
      />
      <SingleFilter
        filter={"volume"}
        options={volumes}
        filters={filters}
        onFilterChange={onFilterChange}
      />
      <SingleFilter
        filter={"vintage"}
        options={vintages}
        filters={filters}
        onFilterChange={onFilterChange}
      />
    </div>
  );
};

export default Filters;
