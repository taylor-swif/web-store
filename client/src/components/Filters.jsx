import SingleFilter from "./SingleFilter";

const Filters = ({ filters, onFilterChange }) => {
  const countries = ["Country1", "Country2", "Country3"];
  const tastes = ["1", "2"];
  const alcohols = ["1", "2"];
  const volumes = ["1", "2"];
  const vintages = ["1", "2"];

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
