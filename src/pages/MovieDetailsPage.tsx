import DocumentMeta from "react-document-meta";
import metadata from "../utils/metadata";
import React from "react";
import { useParams } from "react-router-dom";
import movieApi from "../api/base/movie.api";
import { MovieDetail } from "../types/movie.type";
import MovieCardInfor from "../components/movie/MovieCardInfor";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

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
      {getMovieDetailQuery.isLoading ? (
        <Box
          sx={{ display: "flex", justifyContent: "center", paddingY: "10px", minHeight: "500px", alignItems: "center" }}
        >
          <CircularProgress />
        </Box>
      ) : movie ? (
        <MovieCardInfor movie={movie} />
      ) : (
        <Grid
          container
          justifyContent="center"
          style={{ minHeight: "50vh", marginBottom: "20px", marginTop: "2px" }}
          spacing={4}
        >
          <Grid item xs={11}>
            <Typography variant="h5" fontWeight={"bold"} marginTop={2}>
              Oops! We can&apos;t find the page you&apos;re looking for
            </Typography>
            <Typography variant="body1" align="left" sx={{ mt: 2 }}>
              You tried to request a page that doesn&apos;t exist. If you believe this to be in error, let us know on
              the forums.
            </Typography>
          </Grid>
        </Grid>
      )}
    </DocumentMeta>
  );
};

export default MovieDetailsPage;
