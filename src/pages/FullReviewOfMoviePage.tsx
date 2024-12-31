import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { Pagination } from "../types/response.type";
import { MovieReview } from "../types/movie.type";
import movieApi from "../api/tmdb/movie.api";
import HeaderBackDrop from "../components/cast/HeaderBackDrop";
import ResourceNotFound from "../components/common/ResourceNotFound";
import { Container } from "@mui/material";
import ReviewMovieSkeleton from "../components/skeleton/ReviewMovieSkeleton";
import ReviewMovieCard from "../components/movie/ReviewMovieCard";

const FullReviewOfMoviePage = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = React.useState<Pagination<MovieReview> | null>(null);

  const getReviewOfMovieQuery = useQuery({
    queryKey: ["reviews-movie", movieId],
    queryFn: async () => {
      const response: Pagination<MovieReview> = await movieApi.getReviews(movieId!);
      setReviews(response);
      return response;
    },
    enabled: Boolean(movieId),
  });

  return (
    <div>
      {/* Header */}
      {movieId && !getReviewOfMovieQuery.isError && <HeaderBackDrop movieId={movieId} />}

      {/* List Review */}
      {getReviewOfMovieQuery.isFetching || getReviewOfMovieQuery.isLoading ? (
        <Container maxWidth="xl" className="flex flex-col gap-8 my-4">
          {Array.from(new Array(3)).map((_, index) => (
            <ReviewMovieSkeleton key={index} />
          ))}
        </Container>
      ) : (
        <>
          {getReviewOfMovieQuery.isError ? (
            <ResourceNotFound />
          ) : (
            <Container maxWidth="xl" className="flex flex-col gap-8 my-4">
              {/* Reviews */}
              {reviews?.total_results && reviews.total_results > 0 ? (
                <>{reviews?.results.map((review) => <ReviewMovieCard key={review.id} review={review} />)}</>
              ) : (
                <div className="min-h-[30vh]">
                  We don&apos;t have any reviews for this movie. Would you like to write one?
                </div>
              )}
            </Container>
          )}
        </>
      )}
    </div>
  );
};

export default FullReviewOfMoviePage;
