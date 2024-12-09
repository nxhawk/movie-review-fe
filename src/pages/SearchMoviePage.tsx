import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import Pagination from "@mui/material/Pagination";
import movieApi from "../api/tmdb/movie.api";
import MovieSearchCard from "../components/movie/MovieSearchCard";
import { Movie } from "../types/movie.type";

const SearchMoviePage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClear = () => {
    setSearchValue("");
  };

  const handleSearch = useCallback(
    async (query: string, page: number = 1) => {
      if (query.trim()) {
        try {
          const response = await movieApi.getMovieByQuery(query, page);
          setMovies(response.results);
          setTotalPages(response.total_pages);
          navigate(`/search?query=${query}&page=${page}`);
        } catch (error) {
          console.error("Failed to fetch movies:", error);
        }
      }
    },
    [navigate],
  );

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setPage(1);
      handleSearch(searchValue, 1).then();
    }
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    handleSearch(searchValue, value).then();
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query");
    const page = parseInt(params.get("page") || "1", 10);
    if (query) {
      setSearchValue(query);
      setPage(page);
      handleSearch(query, page).then();
    }
  }, [handleSearch, location.search]);

  return (
    <div className="pt-4 md:mt-6 lg:mt-8 w-full flex flex-col items-center">
      <div className="w-2/3 max-w-xs md:max-w-md lg:max-w-lg xl:max-w-6xl min-w-[200px] mb-5">
        <div className="relative w-full">
          <input
            className="w-full border-2 border-cyan-950 bg-white text-black text-sm md:text-base lg:text-base rounded-full pl-3 md:pl-4 lg:pl-5 pr-20 md:pr-24 lg:pr-32 py-2 md:py-2.5 lg:py-3 focus:outline-none"
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
            className="absolute top-1 right-1 flex items-center rounded-full bg-cyan-950 py-1.5 mb-1 md:py-2 lg:py-2.5 px-2 md:px-2.5 lg:px-3 text-center text-sm md:text-base lg:text-base text-white shadow-sm hover:bg-cyan-900"
            type="button"
            onClick={() => {
              setPage(1);
              handleSearch(searchValue, 1).then();
            }}
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
      <div className="w-full flex flex-wrap justify-center">
        {movies.length > 0 ? (
          movies.map((movie) => <MovieSearchCard key={movie.id} movie={movie} />)
        ) : (
          <p className="mb-5">No movies found. Please try a different search.</p>
        )}
      </div>
      {movies.length > 0 && (
        <div className="mt-2 mb-5">
          <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" />
        </div>
      )}
    </div>
  );
};

export default SearchMoviePage;
