import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React from "react";
import MovieSimpleCard from "../movie/MovieSimpleCard.tsx";
import movieApi from "../../api/tmdb/movie.api";
import { Movie } from "../../types/movie.type.ts";
import TextGradient from "../common/TextGradient.tsx";
import { Typography } from "@mui/material";
import MovieCardSkeleton from "../skeleton/MovieCardSkeleton.tsx";
import { useQuery } from "@tanstack/react-query";

const Trending = () => {
  const [subType, setSubType] = React.useState("today");
  const [movies, setMovies] = React.useState<Movie[]>([]);

  const { isLoading } = useQuery({
    queryKey: ["trendingMovies", subType],
    queryFn: async () => {
      const response = subType === "today" ? await movieApi.getTodayTrending() : await movieApi.getThisWeekTrending();
      setMovies(response.results);
      return response.results;
    },
  });

  return (
    <div className="min-h-40 md:min-h-56 xl:min-h-80 my-5">
      <div className="flex items-center gap-4 pl-5 md:pl-10">
        <Typography color="primary.main" fontWeight={"bold"} fontSize={{ xs: "2em", md: "2.5em" }}>
          Trending
        </Typography>
        <Box className="relative border-2 border-cyan-950 rounded-full flex w-fit">
          <Box
            className="absolute w-[100px] h-[32px] rounded-full transition-all duration-500 ease"
            bgcolor={"primary.main"}
            style={{
              transform: `translateX(${subType === "today" ? 0 : "100px"})`,
            }}
          />
          <Button
            disableRipple
            variant="text"
            sx={{
              width: "100px",
              height: "32px",
              fontWeight: "bold",
              borderRadius: "20px",
              transition: "all 0.1s ease 0.1s",
            }}
            onClick={() => setSubType("today")}
          >
            {subType === "today" ? <TextGradient text="Today" /> : "Today"}
          </Button>
          <Button
            disableRipple
            variant="text"
            sx={{
              width: "100px",
              height: "32px",
              fontWeight: "bold",
              borderRadius: "20px",
              transition: "all 0.1s ease 0.1s",
            }}
            onClick={() => setSubType("weekly")}
          >
            {subType === "weekly" ? <TextGradient text="This Week" /> : "This Week"}
          </Button>
        </Box>
      </div>

      <div className="mt-5">
        {isLoading ? (
          <div className="pl-5 md:pl-10">
            <MovieCardSkeleton />
          </div>
        ) : (
          <div className="relative custom-scrollbar-h flex overflow-auto gap-3 pb-5 px-5 md:px-10">
            {movies.map((movie) => (
              <MovieSimpleCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Trending;
