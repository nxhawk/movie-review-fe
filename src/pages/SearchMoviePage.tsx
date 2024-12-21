import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import Pagination from "@mui/material/Pagination";
import movieApi from "../api/tmdb/movie.api";
import MovieSearchCard from "../components/movie/MovieSearchCard";
import { Movie } from "../types/movie.type";
import path from "../routes/path";
import DocumentMeta from "react-document-meta";
import metadata from "../utils/metadata";
import SearchIcon from "@mui/icons-material/Search";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "../hooks/useDebounce";

const SearchMoviePage = () => {
  const location = useLocation();

  const searchParams = React.useMemo(() => new URLSearchParams(location.search), [location.search]);
  const initialQuery = React.useMemo(() => searchParams.get("query") || "", [searchParams]);
  const initialPage = React.useMemo(() => parseInt(searchParams.get("page") || "1", 10), [searchParams]);

  const [searchValue, setSearchValue] = useState(initialQuery);
  const [searchValueRoot, setSearchValueRoot] = useState(initialQuery);
  const [page, setPage] = useState(initialPage);
  const [storePage, setStorePage] = useState(initialPage);

  const [totalPages, setTotalPages] = useState(1);
  const [movies, setMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();

  const debounceSearchValue = useDebounce({ value: searchValue, delay: 500 });

  React.useEffect(() => {
    setSearchValueRoot(debounceSearchValue);
  }, [debounceSearchValue]);

  useQuery({
    queryKey: ["searching-movie-page", page, searchValueRoot],
    queryFn: async () => {
      metadata.searchMeta.title = `${searchValueRoot} - Searching page ${page} - CineMatch`;
      if (page === storePage) setPage(1);
      setStorePage(page);
      const response = await movieApi.getMovieByQuery(searchValueRoot, page);
      setMovies(response.results);
      setTotalPages(response.total_pages);
      return response;
    },
  });

  const handleClear = () => {
    setSearchValue("");
  };

  const handleSearch = (query: string, page: number = 1) => {
    if (query.trim()) {
      navigate(`${path.SEARCH_MOVIE}?query=${query}&page=${page}`);
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setPage(1);
      handleSearch(searchValue, 1);
    }
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    handleSearch(searchValue, value);
  };

  return (
    <DocumentMeta {...metadata.searchMeta}>
      <div className="pt-5 w-full flex flex-col items-center">
        <div className="w-2/3 max-w-xs md:max-w-md lg:max-w-lg xl:max-w-6xl min-w-[200px] mb-5">
          <div className="relative w-full">
            <input
              className="w-full border-2 border-cyan-950 text-sm md:text-base lg:text-base rounded-full pl-3 md:pl-4 lg:pl-5 pr-20 md:pr-24 lg:pr-32 py-2 md:py-2.5 lg:py-3 focus:outline-none"
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
              className="absolute top-0.5 md:top-1 right-0.5 md:right-1 flex items-center rounded-full bg-cyan-950 py-1.5 mb-1 md:py-2 lg:py-2.5 px-2 md:px-2.5 lg:px-3 text-center text-sm md:text-base lg:text-base text-white shadow-sm hover:bg-cyan-900"
              type="button"
              onClick={() => {
                setPage(1);
                handleSearch(searchValue, 1);
              }}
            >
              <SearchIcon />
              Search
            </button>
          </div>
        </div>
        <div className="w-full flex flex-wrap justify-center">
          {movies.length > 0 ? (
            movies.map((movie) => <MovieSearchCard key={movie.id} movie={movie} />)
          ) : (
            <p className="mb-5 min-h-60">No movies found. Please try a different search.</p>
          )}
        </div>
        {movies.length > 0 && (
          <div className="mt-2 mb-5">
            <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" />
          </div>
        )}
      </div>
    </DocumentMeta>
  );
};

export default SearchMoviePage;
