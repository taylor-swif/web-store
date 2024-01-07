import "./styles/SingleFilter.css";

const SingleFilter = ({
  filter,
  filterName,
  options,
  filters,
  onFilterChange,
}) => {
  return (
    <>
      <div className="single-filter">
        <label>
          <h2>{filterName}</h2>
        </label>
        <div className="options">
          {options.map((option, index) => (
            <div
              key={index}
              className={`option ${
                filters[filter].includes(option) ? "selected" : ""
              }`}
              onClick={() => onFilterChange(filter, option)}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SingleFilter;
