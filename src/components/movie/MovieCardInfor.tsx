import { Grid } from "@mui/material";
import { tmdbConfig } from "../../api/tmdb/tmdb-client";
import { MovieDetail } from "../../types/movie.type";
import { getYearByDate, minToHour, formatDate } from "../../utils/dateFormat";
import UserScore from "./UserScore";
import UserAction from "./UserAction";
import { FastAverageColor } from "fast-average-color";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

type Props = {
  movie: MovieDetail;
};

const fac = new FastAverageColor();

const MovieCardInfor = ({ movie }: Props) => {
  const [bgColor, setBgColor] = React.useState<string>("#343434");
  const [textColor, setTextColor] = React.useState<string>("#ffffff");

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
    getAverageColor(`${tmdbConfig.imageOriginalURL}${movie.poster_path}`);
  }, [movie.poster_path]);

  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${tmdbConfig.imageOriginalURL}/${movie.backdrop_path})` }}
    >
      {/* Add a blur overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: bgColor, // Your calculated background color
          backdropFilter: "blur(10px)", // Apply the blur effect
          opacity: 0.8, // Adjust the transparency
        }}
      ></div>
      <div style={{ position: "relative", color: textColor }}>
        <Grid container justifyContent="center" padding={{ xs: 2, md: 3 }}>
          <Grid item xs={12} md={4} lg={3} padding={3} className="flex justify-center">
            <LazyLoadImage
              alt={movie.title}
              src={movie?.poster_path ? `${tmdbConfig.imageW500URL}${movie.poster_path}` : tmdbConfig.defaultMovieImg}
              className="rounded-lg shadow-lg"
            />
          </Grid>
          <Grid item xs={12} md={8} lg={9} padding={{ xs: 0, md: 2 }}>
            <div>
              <h1 className="text-4xl">
                <span className="font-bold">{movie.title}</span>
                &nbsp;
                {movie.release_date && <span>({getYearByDate(movie.release_date)})</span>}
              </h1>
              {movie.release_date && <p className="mt-1">Release date: {formatDate(movie.release_date)}</p>}
              <div className="flex flex-wrap gap-2">
                <div className="flex gap-1">
                  {movie.genres.map((genre, idx) => (
                    <div key={idx}>
                      {genre.name}
                      {idx !== movie.genres.length - 1 && ","}
                    </div>
                  ))}
                </div>
                <p>&#x1F784; {minToHour(movie.runtime)}</p>
              </div>
            </div>
            {/* User score */}
            <div className="mt-6 mb-3">
              <UserScore showText={true} point={Math.round(movie.vote_average * 10)} size="large" />
            </div>
            <UserAction movieId={movie.id} />
            {/* Tag line */}
            <div className="opacity-80 text-lg italic">{movie.tagline}</div>
            {/* Overview */}
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <h1 className="text-xl font-bold">Overview</h1>
                <p>{movie.overview}</p>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default MovieCardInfor;
