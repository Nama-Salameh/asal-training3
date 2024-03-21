import React from "react";
import "./searchBar.scss";

const SearchBar: React.FC<{
  onSearch: (query: string) => void;
}> = ({ onSearch }) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <input
      placeholder="Search..."
      onChange={handleSearchChange}
      className="searchBar"
    />
  );
};
export default SearchBar;
