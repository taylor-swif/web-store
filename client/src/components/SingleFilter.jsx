import "./styles/SingleFilter.css";

const SingleFilter = ({ filter, options, filters, onFilterChange }) => {
  return (
    <>
      <div className="single-filter">
        <label>
          <h2>{filter}</h2>
        </label>
        <div className="options">
          {options.map((option, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={`${filter}_${index}`}
                value={option}
                checked={filters[filter].includes(option)}
                onChange={() => onFilterChange(filter, option)}
              />
              <label htmlFor={`${filter}_${index}`}>{option}</label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SingleFilter;
