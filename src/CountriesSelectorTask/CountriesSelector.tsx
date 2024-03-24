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
  const [focusedIndex, setFocusedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const countriesContainer = useRef<HTMLUListElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setIsOpen(true);
  };

  const handleOptionClick = (country: Country) => {
    setInputValue(country.name);
    setIsOpen(false);
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setFocusedIndex(
        (prevIndex) => (prevIndex + 1) % filteredCountries.length
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setFocusedIndex(
        (prevIndex) =>
          (prevIndex + filteredCountries.length - 1) % filteredCountries.length
      );
    } else if (event.key === "Escape") {
      event.preventDefault();
      setIsOpen(false);
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (filteredCountries[focusedIndex]) {
        handleOptionClick(filteredCountries[focusedIndex]);
      }
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilteredCountries(
        countriesData.filter((country) =>
          country.name.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    }, 100);

    return () => clearTimeout(timer);
  }, [inputValue]);

  useEffect(() => {
    if (countriesContainer.current) {
      const listItems = countriesContainer.current.children;
      if (listItems && listItems[focusedIndex]) {
        const listItem = listItems[focusedIndex] as HTMLElement;
        const listItemOffsetTop = listItem.offsetTop;
        const listItemHeight = listItem.offsetHeight;
        const containerScrollTop = countriesContainer.current.scrollTop;
        const containerHeight = countriesContainer.current.offsetHeight;
        if (listItemOffsetTop < containerScrollTop) {
          countriesContainer.current.scrollTop = listItemOffsetTop;
        } else if (
          listItemOffsetTop + listItemHeight >
          containerScrollTop + containerHeight
        ) {
          countriesContainer.current.scrollTop =
            listItemOffsetTop + listItemHeight - containerHeight;
        }
      }
    }
  }, [focusedIndex]);

  return (
    <div className="countriesSelectorContainer">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        onKeyDown={handleKeyDown}
        placeholder="Select an option..."
        ref={inputRef}
        className="searchInput"
      />
      {isOpen && (
        <ul className="countriesList" tabIndex={0} ref={countriesContainer}>
          {filteredCountries.map((country, index) => (
            <li
              key={country.id}
              onClick={() => handleOptionClick(country)}
              className={index === focusedIndex ? "selected" : ""}
            >
              {country.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CountriesSelector;
