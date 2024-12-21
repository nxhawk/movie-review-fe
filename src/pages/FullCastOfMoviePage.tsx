import React from "react";
import { useParams } from "react-router-dom";
import { ActorsOfMovie } from "../types/actor.type";
import { useQuery } from "@tanstack/react-query";
import movieApi from "../api/tmdb/movie.api";
import HeaderBackDrop from "../components/cast/HeaderBackDrop";
import { Container } from "@mui/material";
import ListCast from "../components/cast/ListCast";
import ListCrew from "../components/cast/ListCrew";
import AllCastSkeleton from "../components/skeleton/AllCastSkeleton";

const FullCastOfMoviePage = () => {
  const { movieId } = useParams();
  const [actors, setActors] = React.useState<ActorsOfMovie | null>(null);

  const getCastOfMovieQuery = useQuery({
    queryKey: ["casts-movie", movieId],
    queryFn: async () => {
      const response: ActorsOfMovie = await movieApi.getMovieCredit(movieId!);
      setActors(response);
      return response;
    },
    enabled: Boolean(movieId),
  });

  return (
    <div>
      {/* Header */}
      {movieId && <HeaderBackDrop movieId={movieId} />}

      {/* List Cast and Crew */}
      {getCastOfMovieQuery.isFetching || getCastOfMovieQuery.isLoading ? (
        <AllCastSkeleton />
      ) : (
        <Container maxWidth="xl" className="flex flex-col sm:flex-row my-6">
          {/* Cast */}
          {actors?.cast && <ListCast casts={actors.cast} />}
          {/* Crew */}
          {actors?.crew && <ListCrew crews={actors.crew} />}
        </Container>
      )}
    </div>
  );
};

export default FullCastOfMoviePage;
