import React from "react";
import MovieSimpleCard from "../movie/MovieSimpleCard.tsx";
import movieApi from "../../api/base/movie.api";
import { Movie } from "../../types/movie.type.ts";
import { Typography } from "@mui/material";
import MovieCardSkeleton from "../skeleton/MovieCardSkeleton.tsx";
import { useQuery } from "@tanstack/react-query";

const Popular = () => {
  const [movies, setMovies] = React.useState<Movie[]>([]);

  const { isLoading } = useQuery({
    queryKey: ["popularMovies"],
    queryFn: async () => {
      const response = await movieApi.getPopularMovies();
      setMovies(response.results);
      return response.results;
    },
  });

  return (
    <div className="min-h-40 md:min-h-56 xl:min-h-80 my-5">
      <div className="flex items-center gap-4 pl-5 md:pl-10">
        <Typography color="primary.main" fontWeight={"bold"} fontSize={{ xs: "1.2em", md: "1.8em", xl: "2em" }}>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          What's Popular
        </Typography>
      </div>
      <div className="mt-1">
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

export default Popular;
