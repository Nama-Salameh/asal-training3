import React from "react";
import {
  useCountries,
  useCountriesDispatch,
} from "../contexts/countriesContext/CountriesContext";
import "./countriesComponents.scss";

const CountriesChildComponent: React.FC<{ goBack: () => void }> = ({
  goBack,
}) => {
  const countries = useCountries();
  const dispatch = useCountriesDispatch();

  return (
    <div className="countriesContainer">
      <h3>Child component</h3>
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
      <button onClick={goBack} className="transferButton">
        Go Back
      </button>
    </div>
  );
};
export default CountriesChildComponent;
