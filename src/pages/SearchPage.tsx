import React, { useState } from "react";
import DocumentMeta from "react-document-meta";
import metadata from "../utils/metadata";
import { useLocation, useNavigate } from "react-router-dom";
import path from "../routes/path";
import { useQuery } from "@tanstack/react-query";
import movieApi from "../api/base/movie.api";
import personApi from "../api/tmdb/person.api";
import { Movie } from "../types/movie.type";
import SearchInput from "../components/search/SearchInput";
import SearchResultsContainer from "../components/search/SearchResultsContainer";
import SearchTypeSelector from "../components/search/SearchTypeSelector";
import { Stack } from "@mui/material";
import { PersonDetail } from "../types/person.type.ts";

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = React.useMemo(() => new URLSearchParams(location.search), [location.search]);
  const initialQuery = React.useMemo(() => searchParams.get("query") || "", [searchParams]);
  const initialPage = React.useMemo(() => parseInt(searchParams.get("page") || "1", 10), [searchParams]);

  const [searchValue, setSearchValue] = useState(initialQuery);
  const [page, setPage] = useState(initialPage);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [advancedMovies, setAdvancedMovies] = useState<Movie[]>([]);
  const [people, setPeople] = useState<PersonDetail[]>([]);
  const [totalMoviePages, setTotalMoviePages] = useState(1);
  const [totalAdvancedMoviePages, setTotalAdvancedMoviePages] = useState(1);
  const [totalPeoplePages, setTotalPeoplePages] = useState(1);
  const [totalMovieResults, setTotalMovieResults] = useState(0);
  const [totalPeopleResults, setTotalPeopleResults] = useState(0);
  const [selectedType, setSelectedType] = useState("movies");
  const [advancedSearchParams, setAdvancedSearchParams] = useState<any>(null);

  const handleClear = () => {
    setSearchValue("");
    setMovies([]);
    setAdvancedMovies([]);
    setPeople([]);
    setTotalMovieResults(0);
    setTotalPeopleResults(0);
  };

  const handleSearch = (query: string, page: number = 1) => {
    if (query.trim()) {
      if (selectedType === "adv_search") {
        handleApplyFilters({ ...advancedSearchParams, query, page });
      } else {
        navigate(`${path.SEARCH_MOVIE}?query=${query}&page=${page}`);
      }
    } else {
      handleClear();
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
    setAdvancedSearchParams({ ...params, query: searchValue });
    setSelectedType("adv_search");
  };

  const handleClearFilters = () => {
    setAdvancedSearchParams(null);
    setPage(1);
    handleApplyFilters(advancedSearchParams);
  };

  const handleSelectType = (type: string) => {
    setSelectedType(type);
    setPage(1);
    if (type === "adv_search") {
      handleApplyFilters({});
    } else {
      navigate(`${path.SEARCH_MOVIE}?query=${searchValue}&page=1`);
    }
  };

  useQuery({
    queryKey: ["searching-page", page, searchValue, advancedSearchParams],
    queryFn: async () => {
      metadata.searchMeta.title = `${searchValue} - Searching page ${page} - CineMatch`;
      if (selectedType === "adv_search") {
        setAdvancedSearchParams({ ...advancedSearchParams, query: searchValue, page: page });
        const movieAdvancedResponse = await movieApi.getMoviesByAdvancedSearch(advancedSearchParams);
        setAdvancedMovies(movieAdvancedResponse.results);
        setTotalAdvancedMoviePages(movieAdvancedResponse.total_pages);
      } else {
        const movieResponse = await movieApi.getMovieByQuery(searchValue, page);
        const peopleResponse = await personApi.getPeopleByQuery(searchValue, page);
        setMovies(movieResponse.results);
        setPeople(peopleResponse.results);
        setTotalMoviePages(movieResponse.total_pages);
        setTotalPeoplePages(peopleResponse.total_pages);
        setTotalMovieResults(movieResponse.total_results);
        setTotalPeopleResults(peopleResponse.total_results);
      }
      return [];
    },
  });

  return (
    <DocumentMeta {...metadata.searchMeta}>
      <div className="pt-5 w-full flex flex-col items-center">
        <div className="w-full lg:w-1/2 mb-5 px-2" id="search-input-container">
          <SearchInput
            searchValue={searchValue}
            onSearchValueChange={setSearchValue}
            onSearch={() => handleSearch(searchValue, 1)}
            onClear={handleClear}
            onKeyUp={handleKeyUp}
          />
        </div>
        <Stack direction={{ xs: "column", md: "row" }} className="w-full justify-center" id="body-container">
          <SearchTypeSelector
            movieCount={totalMovieResults}
            peopleCount={totalPeopleResults}
            selectedType={selectedType}
            onSelectType={handleSelectType}
          />
          <SearchResultsContainer
            selectedType={selectedType}
            movies={selectedType === "adv_search" ? advancedMovies : movies}
            people={people}
            totalMoviePages={selectedType === "adv_search" ? totalAdvancedMoviePages : totalMoviePages}
            totalPeoplePages={totalPeoplePages}
            page={page}
            onPageChange={handlePageChange}
            onApplyFilters={handleApplyFilters}
            onClearFilters={handleClearFilters}
          />
        </Stack>
      </div>
    </DocumentMeta>
  );
};

export default SearchPage;
