import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import homePageBackground from "../../assets/images/home_page_background.jpg";

const HomeHeader = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchValue.trim()) {
      navigate(`/search?query=${searchValue}`);
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div
      className="min-h-40 md:min-h-56 xl:min-h-80 bg-cover bg-center relative flex items-center justify-items-start"
      style={{ backgroundImage: `url(${homePageBackground})`, backgroundSize: "cover" }}
    >
      <div className="ml-4 md:ml-10 lg:ml-20 xl:ml-52 w-full text-white">
        <h2 className="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">Welcome.</h2>
        <h3 className="text-xs md:text-xl lg:text-xl xl:text-2xl font-bold">
          Millions of movies, and people to discover. Explore now.
        </h3>
        <div className="mt-4 md:mt-6 lg:mt-8 w-full">
          <div className="w-full max-w-xs md:max-w-md lg:max-w-lg xl:max-w-6xl min-w-[200px]">
            <div className="relative">
              <input
                className="w-full bg-white text-black text-sm md:text-base lg:text-base rounded-full pl-3 md:pl-4 lg:pl-5 pr-20 md:pr-24 lg:pr-32 py-2 md:py-2.5 lg:py-3 focus:outline-none"
                placeholder="Search for a movie, person,..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyUp={handleKeyUp}
              />
              <button
                className="absolute top-0.5 right-1 flex items-center rounded-full bg-cyan-950 py-1.5 mb-1 md:py-2 lg:py-2.5 px-2 md:px-2.5 lg:px-3 text-center text-sm md:text-base lg:text-base text-white shadow-sm hover:bg-cyan-900"
                type="button"
                onClick={handleSearch}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 md:w-5 lg:w-6 h-4 md:h-5 lg:h-6 mr-1 md:mr-1.5 lg:mr-2"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                    clipRule="evenodd"
                  />
                </svg>
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
