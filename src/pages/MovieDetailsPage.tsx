import DocumentMeta from "react-document-meta";
import metadata from "../utils/metadata";
import React from "react";
import { useParams } from "react-router-dom";
import movieApi from "../api/base/movie.api";
import { MovieDetail } from "../types/movie.type";
import MovieCardInfor from "../components/movie/MovieCardInfor";
import { useQuery } from "@tanstack/react-query";
import ListCast from "../components/movie/ListCast";
import ResourceNotFound from "../components/common/ResourceNotFound";
import ListRecommendations from "../components/movie/ListRecommendations";
import Reviews from "../components/movie/Reviews";
import MovieDetailSkeleton from "../components/skeleton/MovieDetailSkeleton";

const MovieDetailsPage = () => {
  const [movie, setMovie] = React.useState<MovieDetail | null>(null);
  const { movieId } = useParams();

  const getMovieDetailQuery = useQuery({
    queryKey: ["movie-detail", movieId],
    queryFn: async () => {
      setMovie(null);
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
        <MovieDetailSkeleton />
      ) : movie ? (
        <>
          <MovieCardInfor movie={movie} />
          {/* Top Billed Cast */}
          {movieId && <ListCast movieId={movieId} />}
          {/* Reviews */}
          {movieId && <Reviews movieId={movieId} title={movie.title} />}
          {/* Movie Recommendations */}
          {movieId && movie && <ListRecommendations movie={movie} movieId={movieId} title={movie.title} />}
        </>
      ) : (
        <ResourceNotFound />
      )}
    </DocumentMeta>
  );
};

export default MovieDetailsPage;
