import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import homePageBackground from "../../assets/images/home_page_background.jpg";
import path from "../../constants/path";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

const HomeHeader = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleClear = () => {
    setSearchValue("");
  };
  const handleSearch = () => {
    if (searchValue.trim()) {
      navigate(`${path.SEARCH_MOVIE}?query=${searchValue}`);
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div
      className="min-h-40 md:min-h-56 xl:min-h-80 bg-cover bg-center relative flex items-center justify-center px-3 md:px-10 "
      style={{ backgroundImage: `url(${homePageBackground})`, backgroundSize: "cover" }}
    >
      <div className="w-full text-white">
        <h2 className="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">Welcome.</h2>
        <h3 className="text-xs md:text-xl lg:text-xl xl:text-2xl font-bold">
          Millions of movies, and people to discover. Explore now.
        </h3>
        <div className="mt-4 md:mt-6 lg:mt-8 w-full">
          <div className="w-full">
            <div className="relative">
              <input
                className="w-full bg-white text-black text-sm md:text-base lg:text-base rounded-full pl-3 md:pl-4 lg:pl-5 pr-20 md:pr-24 lg:pr-32 py-2 md:py-2.5 lg:py-3 focus:outline-none"
                placeholder="Search for a movie, person,..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyUp={handleKeyUp}
              />
              {searchValue && (
                <button
                  className="absolute top-1.5 right-20 md:top-2.5 md:right-28 flex items-center py-1.5 mb-1 md:py-2 lg:py-2.5 px-2 md:px-2.5 lg:px-3 text-center"
                  type="button"
                  onClick={handleClear}
                >
                  <ClearIcon className="absolute top-1 right-1" fontSize="small" style={{ color: "red" }} />
                </button>
              )}
              <button
                className="absolute top-0 right-0 md:right-0.5 flex gap-1 h-full md:h-fit items-center rounded-full bg-cyan-950 py-1.5 mt-0 md:mt-0.5 md:py-2 lg:py-2.5 px-2 md:px-2.5 lg:px-3 text-center text-sm md:text-base lg:text-base text-white shadow-sm hover:bg-cyan-900 px-2"
                type="button"
                onClick={handleSearch}
              >
                <SearchIcon />
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
