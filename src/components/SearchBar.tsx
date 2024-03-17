import React,{useState} from "react";
import TextField from "@material-ui/core/TextField";

const SearchBar: React.FC<{
  onSearch: (query: string) => void;
}> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <TextField
      label="Search..."
      variant="outlined"
      value={searchQuery}
      onChange={handleSearchChange}
      fullWidth
    />
  );
};
export default SearchBar;
