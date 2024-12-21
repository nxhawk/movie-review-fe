import { Box, IconButton, useMediaQuery, useScrollTrigger } from "@mui/material";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import movieApi from "../api/tmdb/movie.api";
import { Movie } from "../types/movie.type";
import path from "../routes/path";
import { useQuery } from "@tanstack/react-query";
import CircularProgress from "@mui/material/CircularProgress";
import { AuthContext } from "../contexts/AuthContext";
type Props = {
  showSearch: boolean;
};

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  paddingRight: theme.spacing(0.5),
  height: "100%",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    fontStyle: "italic",
    padding: theme.spacing(1.4, 1, 1.4, 0),
    width: "100%",
  },
}));

export const SearchBar = ({ showSearch }: Props) => {
  const location = useLocation();
  const trigger = useScrollTrigger();
  const matches = useMediaQuery("(max-width:600px)");
  const { auth } = React.useContext(AuthContext)!;

  const searchParams = React.useMemo(() => new URLSearchParams(location.search), [location.search]);
  const initialQuery = React.useMemo(() => searchParams.get("query") || "", [searchParams]);

  const [searchValue, setSearchValue] = useState(initialQuery);
  const [searchValueRoot, setSearchValueRoot] = useState(initialQuery);
  const [showSearchResult, setShowSearchResult] = useState(false);

  const [movies, setMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();

  const debounceSearchValue = useDebounce({ value: searchValue, delay: 500 });

  React.useEffect(() => {
    setSearchValueRoot(debounceSearchValue);
  }, [debounceSearchValue]);

  React.useEffect(() => {
    setSearchValue("");
    setSearchValueRoot("");
  }, [location.pathname]);

  const { isLoading } = useQuery({
    queryKey: ["searching-movie", searchValueRoot],
    queryFn: async () => {
      const response = await movieApi.getMovieByQuery(searchValueRoot, 1);
      setMovies(response.results);
      setShowSearchResult(true);
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
      handleSearch(searchValue, 1);
    }
  };

  useEffect(() => {
    if (trigger) {
      setShowSearchResult(false);
    }
  }, [trigger]);

  return (
    <>
      {showSearch && (
        <>
          <Box
            sx={{
              position: "fixed",
              top: trigger ? 0 : matches && !auth ? "52px" : "62px",
              left: 0,
              width: "100%",
              backgroundColor: "white",
              color: "gray",
              zIndex: 1100,
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              transition: "top 0.2s ease",
            }}
          >
            <Search sx={{ paddingX: matches ? "12px" : "15px", borderBottom: "1px solid #f3f3f3" }}>
              <SearchIconWrapper>
                <SearchIcon sx={{ color: "black" }} />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search for a movie, person..."
                inputProps={{ "aria-label": "search" }}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyUp={handleKeyUp}
              />
              {isLoading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress color="inherit" size={20} />
                </Box>
              ) : (
                <IconButton onClick={handleClear}>
                  <CloseIcon />
                </IconButton>
              )}
            </Search>
            {movies.length > 0 && showSearchResult && (
              <Box sx={{ width: "100%", display: "inline-block" }}>
                {movies.slice(0, 12).map((movie) => (
                  <Link
                    to={`${path.SEARCH_MOVIE}?query=${movie.title}&page=1`}
                    key={movie.id}
                    className="w-full border-b text-sm text-black px-3 py-0.5 cursor-pointer hover:bg-slate-100 block"
                  >
                    {movie.title}
                  </Link>
                ))}
              </Box>
            )}
            {!isLoading && movies.length === 0 && searchValueRoot && showSearchResult && (
              <Box sx={{ width: "100%", display: "inline-block" }}>
                <p className="w-full text-lg text-black px-3 py-0.5">No results</p>
              </Box>
            )}
          </Box>
        </>
      )}
    </>
  );
};
