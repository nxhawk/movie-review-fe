import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React from "react";
import MovieSimpleCard from "../movie/MovieSimpleCard.tsx";
import movieApi from "../../api/base/movie.api";
import { Movie } from "../../types/movie.type.ts";
import TextGradient from "../common/TextGradient.tsx";
import { Typography } from "@mui/material";
import MovieCardSkeleton from "../skeleton/MovieCardSkeleton.tsx";
import { useQuery } from "@tanstack/react-query";

const LatestTrailer = () => {
  const [subType, setSubType] = React.useState("popular");
  const [movies, setMovies] = React.useState<Movie[]>([]);

  const { isLoading } = useQuery({
    queryKey: ["trendingMovies", subType],
    queryFn: async () => {
      const response = subType === "popular" ? await movieApi.getTodayTrending() : await movieApi.getThisWeekTrending();
      setMovies(response.results);
      return response.results;
    },
  });

  return (
    <div className="min-h-40 md:min-h-56 xl:min-h-80 my-5">
      <div className="flex items-center gap-4 pl-5 md:pl-10">
        <Typography color="primary.main" fontWeight={"bold"} fontSize={{ xs: "1.2em", md: "1.8em", xl: "2em" }}>
          Latest Trailer
        </Typography>
        <Box className="relative border-2 border-cyan-950 rounded-full flex w-fit">
          <Box
            className="absolute w-[100px] h-[32px] rounded-full transition-all duration-500 ease"
            bgcolor={"primary.main"}
            style={{
              transform: `translateX(${subType === "popular" ? 0 : "100px"})`,
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
            onClick={() => setSubType("popular")}
          >
            {subType === "popular" ? <TextGradient text="Popular" /> : "Popular"}
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
            onClick={() => setSubType("theaters")}
          >
            {subType === "theaters" ? <TextGradient text="In Theaters" /> : "In Theaters"}
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

export default LatestTrailer;
