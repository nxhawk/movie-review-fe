import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React from "react";
import movieApi from "../../api/base/movie.api";
import { MovieTrailer } from "../../types/movie.type.ts";
import TextGradient from "../common/TextGradient.tsx";
import { Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import MovieTrailerCard from "../movie/MovieTrailerCard.tsx";
import TrailerCardSkeleton from "../skeleton/TrailerCardSkeleton.tsx";
import homeBackground from "../../assets/images/background-home.jpg";

const LatestTrailer = () => {
  const [subType, setSubType] = React.useState("popular");
  const [movies, setMovies] = React.useState<MovieTrailer[]>([]);

  const { isLoading } = useQuery({
    queryKey: ["latestTrailers", subType],
    queryFn: async () => {
      const response =
        subType === "popular" ? await movieApi.getReleaseDateRange() : await movieApi.getNowPlayingTrailers();
      setMovies(response);
      return response;
    },
  });

  return (
    <div className="bg-center bg-cover w-full relative">
      <div className="min-h-40 md:min-h-56 xl:min-h-80 my-10">
        <div
          className="bg-transparent"
          style={{
            backgroundImage: `url(${homeBackground})`,
          }}
        >
          <div className="bg-purple-900/60">
            <div className="flex items-center gap-4 pl-5 md:pl-10 pt-8">
              <Typography color="white" fontWeight={"bold"} fontSize={{ xs: "1.2em", md: "1.8em", xl: "2em" }}>
                Latest Trailer
              </Typography>
              <Box className="relative border-2 border-cyan-700 rounded-full flex w-fit">
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
                    color: "#e5e7eb",
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
                    color: "#e5e7eb",
                  }}
                  onClick={() => setSubType("theaters")}
                >
                  {subType === "theaters" ? <TextGradient text="In Theaters" /> : "In Theaters"}
                </Button>
              </Box>
            </div>

            <div className="mt-5">
              {isLoading ? (
                <TrailerCardSkeleton />
              ) : (
                <div className="relative custom-scrollbar-h flex overflow-auto gap-3 pb-8 px-5 md:px-10">
                  {movies.map((movie) => (
                    <MovieTrailerCard key={movie.id} movie={movie} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestTrailer;
