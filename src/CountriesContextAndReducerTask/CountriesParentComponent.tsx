import React from "react";
import {
  useCountries,
  useCountriesDispatch,
} from "../contexts/countriesContext/CountriesContext";
import "./countriesComponents.scss";

const CountriesParentComponent: React.FC<{ goToChild: () => void }> = ({
  goToChild,
}) => {
  const countries = useCountries();
  const dispatch = useCountriesDispatch();
  
  return (
    <div className="countriesContainer">
      <h3>Parent component</h3>
      {countries?.map((country) => (
        <div key={country.id} className="countryContainer">
          <h4>{country.name} </h4>
          <p>{country.description}</p>
          <button
            className="deleteButton"
            onClick={() => {
              dispatch({ type: "delete", id: country.id });
            }}
          >
            Delete
          </button>
        </div>
      ))}
      <button onClick={goToChild} className="transferButton">
        Go to Child
      </button>
    </div>
  );
};
export default CountriesParentComponent;
