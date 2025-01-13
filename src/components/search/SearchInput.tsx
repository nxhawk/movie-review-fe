import React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";

interface SearchInputProps {
  searchValue: string;
  // eslint-disable-next-line no-unused-vars
  onSearchValueChange: (value: string) => void;
  onSearch: () => void;
  onClear: () => void;
  // eslint-disable-next-line no-unused-vars
  onKeyUp: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ searchValue, onSearchValueChange, onSearch, onClear, onKeyUp }) => {
  return (
    <div className="relative w-full">
      <input
        className="w-full border-2 border-cyan-950 text-sm md:text-base lg:text-base rounded-full pl-3 md:pl-4 lg:pl-5 pr-20 md:pr-24 lg:pr-32 py-2 md:py-2.5 lg:py-3 focus:outline-none"
        placeholder="Search for a movie, person,..."
        value={searchValue}
        onChange={(e) => onSearchValueChange(e.target.value)}
        onKeyUp={onKeyUp}
      />
      {searchValue && (
        <button
          className="absolute top-1.5 right-20 md:top-2.5 md:right-28 flex items-center py-1.5 mb-1 md:py-2 lg:py-2.5 px-2 md:px-2.5 lg:px-3 text-center"
          type="button"
          onClick={onClear}
        >
          <ClearIcon className="absolute top-1 right-1" fontSize="small" style={{ color: "red" }} />
        </button>
      )}
      <button
        className="absolute top-0 right-0 flex items-center rounded-full bg-cyan-950 py-1.5 h-full md:py-2 lg:py-2.5 px-2 md:px-2.5 lg:px-3 text-center text-sm md:text-base lg:text-base text-white shadow-sm hover:bg-cyan-900"
        type="button"
        onClick={onSearch}
      >
        <SearchIcon />
        Search
      </button>
    </div>
  );
};

export default SearchInput;
