import DocumentMeta from "react-document-meta";
import metadata from "../utils/metadata";
import React from "react";
import { useParams } from "react-router-dom";
import movieApi from "../api/tmdb/movie.api";
import { MovieDetail } from "../types/movie.type";
import MovieCardInfor from "../components/movie/MovieCardInfor";
import { Box, CircularProgress } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import ListCast from "../components/movie/ListCast";
import ResourceNotFound from "../components/common/ResourceNotFound";

const MovieDetailsPage = () => {
  const [movie, setMovie] = React.useState<MovieDetail | null>(null);
  const { movieId } = useParams();

  const getMovieDetailQuery = useQuery({
    queryKey: ["movie-detail", movieId],
    queryFn: async () => {
      const response: MovieDetail = await movieApi.getDetails(movieId!);
      metadata.movieDetailsMeta.title = `${response.title} - Movie Details - CineMatch`;
      setMovie(response);
      return response;
    },
    enabled: Boolean(movieId),
  });

  if (getMovieDetailQuery.isError) {
    metadata.movieDetailsMeta.title = `Page Not Found - Movie Details - CineMatch`;
  }

  return (
    <DocumentMeta {...metadata.movieDetailsMeta}>
      {/* Group movie information */}
      {getMovieDetailQuery.isFetching || getMovieDetailQuery.isLoading ? (
        <Box
          sx={{ display: "flex", justifyContent: "center", paddingY: "10px", minHeight: "500px", alignItems: "center" }}
        >
          <CircularProgress />
        </Box>
      ) : movie ? (
        <>
          <MovieCardInfor movie={movie} />
          {/* List Cast */}
          {movieId && <ListCast movieId={movieId} />}
        </>
      ) : (
        <ResourceNotFound />
      )}
    </DocumentMeta>
  );
};

export default MovieDetailsPage;
