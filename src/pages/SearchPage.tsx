import DocumentMeta from "react-document-meta";
import metadata from "../utils/metadata";
import SearchMoviesList from "../components/search/SearchMoviesList.tsx";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import path from "../routes/path.ts";
import { useQuery } from "@tanstack/react-query";
import movieApi from "../api/base/movie.api.ts";
import personApi from "../api/tmdb/person.api.ts";
import { Movie } from "../types/movie.type.ts";
import Pagination from "@mui/material/Pagination";
import { Box, Stack } from "@mui/material";
import SearchResults from "../components/search/SearchResults.tsx";
import FilterOptions from "../components/search/FilterOptions.tsx";
import SearchPeopleList from "../components/search/SearchPeopleList.tsx";

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = React.useMemo(() => new URLSearchParams(location.search), [location.search]);
  const initialQuery = React.useMemo(() => searchParams.get("query") || "", [searchParams]);
  const initialPage = React.useMemo(() => parseInt(searchParams.get("page") || "1", 10), [searchParams]);

  const [searchValue, setSearchValue] = useState(initialQuery);
  const [page, setPage] = useState(initialPage);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [people, setPeople] = useState<any[]>([]);
  const [totalMoviePages, setTotalMoviePages] = useState(1);
  const [totalPeoplePages, setTotalPeoplePages] = useState(1);
  const [totalMovieResults, setTotalMovieResults] = useState(0);
  const [totalPeopleResults, setTotalPeopleResults] = useState(0);
  const [selectedType, setSelectedType] = useState("movies");
  const [advancedSearchParams, setAdvancedSearchParams] = useState<any>(null);

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
    if (selectedType === "adv_search") {
      handleApplyFilters({ ...advancedSearchParams, page: value });
    } else {
      handleSearch(searchValue, value);
    }
  };

  const handleApplyFilters = (params: any) => {
    setAdvancedSearchParams(params);
    setSelectedType("adv_search");
  };

  const handleSelectType = (type: string) => {
    setSelectedType(type);
    if (type === "adv_search") {
      handleApplyFilters({});
    } else {
      handleSearch(searchValue, 1);
    }
  };

  useQuery({
    queryKey: ["searching-page", page, searchValue, advancedSearchParams],
    queryFn: async () => {
      metadata.searchMeta.title = `${searchValue} - Searching page ${page} - CineMatch`;
      const movieResponse = advancedSearchParams
        ? await movieApi.getPopularMovies()
        : await movieApi.getMovieByQuery(searchValue, page);
      const peopleResponse = await personApi.getPeopleByQuery(searchValue, page);
      setMovies(movieResponse.results);
      setPeople(peopleResponse.results);
      setTotalMoviePages(movieResponse.total_pages);
      setTotalPeoplePages(peopleResponse.total_pages);
      if (selectedType != "adv_search") {
        setTotalMovieResults(movieResponse.total_results);
      }
      setTotalPeopleResults(peopleResponse.total_results);
      return { movieResponse, peopleResponse };
    },
  });

  return (
    <DocumentMeta {...metadata.searchMeta}>
      <div className="pt-5 w-full flex flex-col items-center">
        <div className="w-full lg:w-1/2 mb-5 px-2">
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
              className="absolute top-0 right-0 flex items-center rounded-full bg-cyan-950 py-1.5 h-full md:py-2 lg:py-2.5 px-2 md:px-2.5 lg:px-3 text-center text-sm md:text-base lg:text-base text-white shadow-sm hover:bg-cyan-900"
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
        <Stack direction={{ xs: "column", md: "row" }} gap={2} className="w-full justify-center">
          <div className="w-full md:w-1/5 flex justify-end px-2">
            <SearchResults
              movieCount={totalMovieResults}
              peopleCount={totalPeopleResults}
              selectedType={selectedType}
              onSelectType={handleSelectType}
            />
          </div>
          {selectedType === "adv_search" ? (
            <div className="w-full block md:hidden px-2">
              <FilterOptions onApplyFilters={handleApplyFilters} />
            </div>
          ) : null}
          {selectedType === "movies" || selectedType === "adv_search" ? (
            <SearchMoviesList movies={movies} />
          ) : (
            <SearchPeopleList people={people} />
          )}
          <div className="w-1/5 hidden md:block">
            {selectedType === "adv_search" ? <FilterOptions onApplyFilters={handleApplyFilters} /> : null}
          </div>
        </Stack>
        {(selectedType === "movies" || selectedType === "adv_search") && movies.length > 0 && (
          <>
            <Box sx={{ display: { xs: "block", md: "none" } }} className="mt-2 mb-5">
              <Pagination
                count={totalMoviePages}
                page={page}
                size={"small"}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
            <Box sx={{ display: { xs: "none", md: "block" } }} className="mt-2 mb-5">
              <Pagination count={totalMoviePages} page={page} onChange={handlePageChange} color="primary" />
            </Box>
          </>
        )}
        {selectedType === "people" && people.length > 0 && (
          <>
            <Box sx={{ display: { xs: "block", md: "none" } }} className="mt-2 mb-5">
              <Pagination
                count={totalPeoplePages}
                page={page}
                size={"small"}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
            <Box sx={{ display: { xs: "none", md: "block" } }} className="mt-2 mb-5">
              <Pagination count={totalPeoplePages} page={page} onChange={handlePageChange} color="primary" />
            </Box>
          </>
        )}
      </div>
    </DocumentMeta>
  );
};

export default SearchPage;
