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
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (focusedIndex !== null) {
      return;
    }
    setInputValue(event.target.value);
    setIsOpen(true);
  };

  const handleOptionClick = (country: Country) => {
    setInputValue(country.name);
    setIsOpen(false);
    if (containerRef.current) {
      containerRef.current.blur();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (focusedIndex === null) {
        setFocusedIndex(0);
      } else if (focusedIndex < filteredCountries.length - 1) {
        setFocusedIndex((prevIndex) =>
          prevIndex !== null ? prevIndex + 1 : 0
        );
      }
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (focusedIndex === 0 || focusedIndex === null) {
        setFocusedIndex(null);
      } else {
        setFocusedIndex((prevIndex) =>
          prevIndex !== null ? prevIndex - 1 : 0
        );
      }
    } else if (event.key === "Escape") {
      event.preventDefault();
      setIsOpen(false);
      setInputValue("");
      setFocusedIndex(null);
      if (containerRef.current) {
        containerRef.current.querySelector("input")?.blur();
      }
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (focusedIndex !== null) {
        handleOptionClick(filteredCountries[focusedIndex]);
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
        setFocusedIndex(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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
    const scrollToSelectedListItem = () => {
      if (containerRef.current && focusedIndex !== null) {
        const focusedItem = containerRef.current.children[1].children[
          focusedIndex
        ] as HTMLElement;
        if (focusedItem) {
          focusedItem.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest",
          });
        }
      }
    };

    scrollToSelectedListItem();
  }, [focusedIndex]);

  return (
    <div className="countriesSelectorContainer" ref={containerRef}>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder="Select an option..."
        className="searchInput"
      />
      {isOpen && (
        <ul className="countriesList">
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
