import { useQuery } from "@tanstack/react-query";
import React from "react";
import { MovieDetail } from "../../types/movie.type";
import movieApi from "../../api/tmdb/movie.api";
import { tmdbConfig } from "../../api/tmdb/tmdb-client";
import { Box, Grid } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getYearByDate } from "../../utils/dateFormat";
import { Link } from "react-router-dom";
import dynamicPath from "../../routes/dynamicPath";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useExtractColors } from "react-extract-colors";
import { isLightColor } from "../../utils/helper";

type Props = {
  movieId: string | number;
};

const HeaderBackDrop = ({ movieId }: Props) => {
  const [movie, setMovie] = React.useState<MovieDetail | null>(null);
  const { dominantColor } = useExtractColors(`${tmdbConfig.imageOriginalURL}${movie?.poster_path}`);

  useQuery({
    queryKey: ["movie-detail", movieId],
    queryFn: async () => {
      const response: MovieDetail = await movieApi.getDetails(movieId!);
      setMovie(response);
      return response;
    },
    enabled: Boolean(movieId),
  });

  return (
    <Box
      bgcolor={dominantColor || "#343434"}
      paddingY={2}
      style={{ color: dominantColor ? (isLightColor(dominantColor) ? "#000000" : "#ffffff") : "#ffffff" }}
    >
      <Grid
        container
        sx={{ display: "flex", gap: 3, alignItems: "center", flexWrap: "nowrap" }}
        paddingX={{ xs: 2, md: 3 }}
      >
        {movie ? (
          <>
            <LazyLoadImage
              alt={movie.title}
              src={movie?.poster_path ? `${tmdbConfig.imageW58URL}${movie.poster_path}` : tmdbConfig.defaultMovieImg}
              className="rounded shadow-lg w-[58px]"
            />
            <div className="flex flex-col gap-2">
              <h1 className="text-xl md:text-3xl">
                <span className="font-bold">{movie.title}</span>
                &nbsp;
                {movie.release_date && <span>({getYearByDate(movie.release_date)})</span>}
              </h1>
              <Link
                to={dynamicPath.MOVIE_DETAILS(movieId)}
                className="text-sx md:text-xl font-medium opacity-70 hover:opacity-50 flex items-center gap-1"
              >
                <ArrowBackIcon />
                Quay lại trang chính
              </Link>
            </div>
          </>
        ) : (
          <Link
            to={dynamicPath.MOVIE_DETAILS(movieId)}
            className="text-xl font-medium opacity-70 hover:opacity-50 flex items-center gap-1"
          >
            <ArrowBackIcon />
            Quay lại trang chính
          </Link>
        )}
      </Grid>
    </Box>
  );
};

export default HeaderBackDrop;
