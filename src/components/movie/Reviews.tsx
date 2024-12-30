import { Box, Chip, Container, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import movieApi from "../../api/tmdb/movie.api";
import { Pagination } from "../../types/response.type";
import { MovieReview } from "../../types/movie.type";
import ReviewMovieCard from "./ReviewMovieCard";
import dynamicPath from "../../routes/dynamicPath";
import { Link } from "react-router-dom";
import ReviewMovieSkeleton from "../skeleton/ReviewMovieSkeleton";

type Props = {
  movieId: string | number;
  title: string;
};

const Reviews = ({ movieId, title }: Props) => {
  const [reviews, setReviews] = React.useState<Pagination<MovieReview> | null>(null);
  const [haveData, setHaveData] = React.useState(false);

  const getReviewOfMovieQuery = useQuery({
    queryKey: ["reviews-movie", movieId],
    queryFn: async () => {
      const response: Pagination<MovieReview> = await movieApi.getReviews(movieId!);
      setReviews(response);
      setHaveData(response.results.length > 0);
      return response;
    },
    enabled: Boolean(movieId),
  });

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3 }}>
      {/* title */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box
          sx={{
            width: "fit-content",
            borderBottom: "4px solid #272626",
            display: "flex",
            gap: 1,
            paddingY: 0.5,
            alignItems: "center",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Reviews
          </Typography>
          <Chip label={reviews?.total_results || 0} color="primary" size="small" />
        </Box>
        {haveData && (
          <Link
            to={dynamicPath.FULL_REVIEWS(movieId)}
            className="flex text-xl font-medium font-mono items-center hover:text-gray-500 text-black"
          >
            Read All Reviews
          </Link>
        )}
      </Box>

      {/* Carousel */}
      {getReviewOfMovieQuery.isFetching || getReviewOfMovieQuery.isLoading ? (
        <ReviewMovieSkeleton />
      ) : (
        <>
          {haveData && reviews ? (
            <div className="mt-3">
              <ReviewMovieCard review={reviews?.results[0]} />
            </div>
          ) : (
            <div className="my-3">
              We don&apos;t have any reviews for <b>{title}</b>. Would you like to write one?
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default Reviews;
