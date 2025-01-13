import React from "react";
import { Box, Pagination, Stack } from "@mui/material";
import SearchMoviesList from "./SearchMoviesList";
import SearchPeopleList from "./SearchPeopleList";
import FilterOptions from "./FilterOptions";

interface SearchResultsContainerProps {
  selectedType: string;
  movies: any[];
  people: any[];
  totalMoviePages: number;
  totalPeoplePages: number;
  page: number;
  // eslint-disable-next-line no-unused-vars
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
  // eslint-disable-next-line no-unused-vars
  onApplyFilters: (params: any) => void;
  onClearFilters: () => void;
}

const SearchResultsContainer: React.FC<SearchResultsContainerProps> = ({
  selectedType,
  movies,
  people,
  totalMoviePages,
  totalPeoplePages,
  page,
  onPageChange,
  onApplyFilters,
  onClearFilters,
}) => {
  return (
    <>
      <div id="filter-option-container">
        {selectedType === "adv_search" ? (
          <div className="w-full block md:hidden px-2">
            <FilterOptions onApplyFilters={onApplyFilters} onClearFilters={onClearFilters} />
          </div>
        ) : null}
      </div>
      <Stack direction={"column"} gap={2} className="w-full md:w-1/2 items-center">
        {selectedType === "movies" || selectedType === "adv_search" ? (
          <SearchMoviesList movies={movies} />
        ) : (
          <SearchPeopleList people={people} />
        )}
        <div id="pagination-container">
          {(selectedType === "movies" || selectedType === "adv_search") && movies && movies.length > 0 && (
            <>
              <Box sx={{ display: { xs: "block", md: "none" } }} className="mt-2 mb-5">
                <Pagination
                  count={totalMoviePages}
                  page={page}
                  size={"small"}
                  onChange={onPageChange}
                  color="primary"
                />
              </Box>
              <Box sx={{ display: { xs: "none", md: "block" } }} className="mt-2 mb-5">
                <Pagination count={totalMoviePages} page={page} onChange={onPageChange} color="primary" />
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
                  onChange={onPageChange}
                  color="primary"
                />
              </Box>
              <Box sx={{ display: { xs: "none", md: "block" } }} className="mt-2 mb-5">
                <Pagination count={totalPeoplePages} page={page} onChange={onPageChange} color="primary" />
              </Box>
            </>
          )}
        </div>
      </Stack>
      <div id="filter-option-container" className="w-full md:w-1/4">
        <div className="ml-5 w-4/5 hidden md:block">
          {selectedType === "adv_search" ? (
            <FilterOptions onApplyFilters={onApplyFilters} onClearFilters={onClearFilters} />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default SearchResultsContainer;
