import React, { useEffect, useRef, useState } from "react";
import countriesData from "../constants/countries";
import "./countriesSelector.scss";

interface Country {
  name: string;
  id: number;
}

const CountriesSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [filteredCountries, setFilteredCountries] =
    useState<Country[]>(countriesData);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setIsOpen(true);

    const timer = setTimeout(() => {
      setFilteredCountries(
        countriesData.filter((country) =>
          country.name.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    }, 100);
    return () => clearTimeout(timer);
  };

  const handleOptionClick = (country: Country) => {
    setInputValue(country.name);
    setIsOpen(false);
    document.getElementById("searchInput")?.blur();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      document.getElementById("country0")?.focus();
    }
  };

  const handelListKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    index: number
  ) => {
    event.preventDefault();
    switch (event.key) {
      case "ArrowDown":
        index++;
        if (index === filteredCountries.length) {
          document.getElementById("country0")?.focus();
        } else if (index < filteredCountries.length) {
          document.getElementById(`country${index}`)?.focus();
        }
        break;
      case "ArrowUp":
        index--;
        if (index === -1) {
          document.getElementById("searchInput")?.focus();
        }
        document.getElementById(`country${index}`)?.focus();
        break;
      case "Enter":
        if (index !== -1) {
          handleOptionClick(filteredCountries[index]);
        }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setInputValue("");
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="countriesSelectorContainer" ref={containerRef}>
      <input
        id="searchInput"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder="Select a country..."
        className="searchInput"
      />
      {isOpen && (
        <div className="countriesList">
          {filteredCountries.map((country, index) => {
            return (
              <div
                tabIndex={0}
                id={`country${index}`}
                key={index}
                onClick={() => handleOptionClick(country)}
                onKeyDown={(e) => handelListKeyDown(e, index)}
              >
                {country.name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default CountriesSelector;
