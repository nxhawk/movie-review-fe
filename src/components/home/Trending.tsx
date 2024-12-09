import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React from "react";
import MovieSimpleCard from "../movie/MovieSimpleCard.tsx";
import movieApi from "../../api/tmdb/movie.api";
import { Movie } from "../../types/movie.type.ts";

const Trending = () => {
  const [subType, setSubType] = React.useState("today");
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchTrendingMovies = async () => {
      setIsLoading(true);
      try {
        const response = subType === "today" ? await movieApi.getTodayTrending() : await movieApi.getThisWeekTrending();
        setMovies(response.results);
      } catch (error) {
        console.error("Failed to fetch trending movies:", error);
      }
      setIsLoading(false);
    };

    fetchTrendingMovies().then();
  }, [subType]);

  return (
    <div className="min-h-40 md:min-h-56 xl:min-h-80 mt-5">
      <div className="flex items-center gap-4 ml-4 md:ml-10 lg:ml-20 xl:ml-52">
        <h3 className="text-xs md:text-xl lg:text-xl xl:text-2xl font-bold text-cyan-950">Trending</h3>
        <Box className="relative border-2 border-cyan-950 rounded-full flex w-fit">
          <Box
            className="absolute w-[100px] h-[40px] bg-[#032541] rounded-full transition-all duration-500 ease"
            style={{
              transform: `translateX(${subType === "today" ? 0 : "100px"})`,
            }}
          />
          <Button
            disableRipple
            variant="text"
            sx={{
              width: "100px",
              height: "40px",
              fontWeight: "bold",
              borderRadius: "20px",
              transition: "all 0.2s ease 0.1s",
              color: subType === "today" ? "white" : "#032541",
            }}
            onClick={() => setSubType("today")}
          >
            Today
          </Button>
          <Button
            disableRipple
            variant="text"
            sx={{
              width: "100px",
              height: "40px",
              fontWeight: "bold",
              borderRadius: "20px",
              transition: "all 0.2s ease 0.1s",
              color: subType === "weekly" ? "white" : "#032541",
            }}
            onClick={() => setSubType("weekly")}
          >
            This Week
          </Button>
        </Box>
      </div>

      <div className="ml-4 md:ml-10 lg:ml-20 xl:ml-52 mt-5">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="relative">
            <Box sx={{ display: "flex", overflowX: "auto", gap: 2, width: "99%" }}>
              {movies.map((movie) => (
                <MovieSimpleCard key={movie.id} movie={movie} />
              ))}
            </Box>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trending;
