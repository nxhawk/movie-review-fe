import { useQuery } from "@tanstack/react-query";
import React from "react";
import { MovieDetail } from "../../types/movie.type";
import movieApi from "../../api/tmdb/movie.api";
import { FastAverageColor } from "fast-average-color";
import { tmdbConfig } from "../../api/tmdb/tmdb-client";
import { Box, Container } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getYearByDate } from "../../utils/dateFormat";
import { Link } from "react-router-dom";
import dynamicPath from "../../routes/dynamicPath";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

type Props = {
  movieId: string | number;
};

const fac = new FastAverageColor();

const HeaderBackDrop = ({ movieId }: Props) => {
  const [bgColor, setBgColor] = React.useState<string>("#343434");
  const [textColor, setTextColor] = React.useState<string>("#ffffff");
  const [movie, setMovie] = React.useState<MovieDetail | null>(null);

  React.useEffect(() => {
    const getAverageColor = async (image: string) => {
      await fac
        .getColorAsync(image)
        .then((color) => {
          setBgColor(color.rgba);
          setTextColor(color.isDark ? "#fff" : "#000");
        })
        .catch((e) => {
          console.log(e);
        });
    };
    if (movie?.poster_path) getAverageColor(`${tmdbConfig.imageOriginalURL}${movie.poster_path}`);
  }, [movie?.poster_path]);

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
    <Box bgcolor={bgColor} paddingY={2} style={{ color: textColor }}>
      <Container maxWidth="xl" sx={{ display: "flex", gap: 3, alignItems: "center" }}>
        {movie ? (
          <>
            <LazyLoadImage
              alt={movie.title}
              src={movie?.poster_path ? `${tmdbConfig.imageW58URL}${movie.poster_path}` : tmdbConfig.defaultMovieImg} // use normal <img> attributes as props
              wrapperProps={{
                style: { transitionDelay: "1s" },
              }}
              className="rounded shadow-lg"
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
      </Container>
    </Box>
  );
};

export default HeaderBackDrop;
