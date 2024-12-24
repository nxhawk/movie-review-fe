import { Grid, Typography } from "@mui/material";
import { tmdbConfig } from "../../api/tmdb/tmdb-client";
import { MovieDetail } from "../../types/movie.type";
import { getYearByDate, minToHour, formatDate } from "../../utils/dateFormat";
import UserScore from "./UserScore";
import UserAction from "./UserAction";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useExtractColors } from "react-extract-colors";
import { isLightColor } from "../../utils/helper";

type Props = {
  movie: MovieDetail;
};

const MovieCardInfor = ({ movie }: Props) => {
  const { dominantColor } = useExtractColors(`${tmdbConfig.imageOriginalURL}${movie.poster_path}`);
  const formatter = (money: number) => {
    return money.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

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
          backgroundColor: dominantColor || "#343434",
          backdropFilter: "blur(10px)", // Apply the blur effect
          opacity: 0.8, // Adjust the transparency
        }}
      ></div>
      <div
        style={{
          position: "relative",
          color: dominantColor ? (isLightColor(dominantColor) ? "#000000" : "#ffffff") : "#ffffff",
        }}
      >
        <Grid container justifyContent="center" padding={{ xs: 2, md: 3 }}>
          <Grid item xs={12} md={5} lg={3} paddingTop={2} className="flex items-start justify-center">
            <LazyLoadImage
              alt={movie.title}
              src={movie?.poster_path ? `${tmdbConfig.imageW500URL}${movie.poster_path}` : tmdbConfig.defaultMovieImg}
              className="rounded-lg shadow-lg"
            />
          </Grid>
          <Grid item xs={12} md={7} lg={9} paddingTop={2} paddingLeft={{ xs: 0, md: 5 }}>
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
                {movie.runtime > 0 && <p>&#x1F784; {minToHour(movie.runtime)}</p>}
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
                <p>
                  {movie.overview
                    ? movie.overview
                    : "We don't have an overview translated in English. Help us expand our database by adding one."}
                </p>
              </div>
            </div>
            {/*  */}
            <div className="mt-5 grid grid-cols-2 gap-y-3">
              <div>
                <Typography variant="body1" fontWeight={"bold"}>
                  Original Title
                </Typography>
                <Typography variant="body1">{movie.original_title}</Typography>
              </div>
              <div>
                <Typography variant="body1" fontWeight={"bold"}>
                  Status
                </Typography>
                <Typography variant="body1">{movie.status}</Typography>
              </div>

              <div>
                <Typography variant="body1" fontWeight={"bold"}>
                  Budget
                </Typography>
                <Typography variant="body1">{movie.budget ? formatter(movie.budget) : "-"}</Typography>
              </div>
              <div>
                <Typography variant="body1" fontWeight={"bold"}>
                  Revenue
                </Typography>
                <Typography variant="body1">{movie.revenue ? formatter(movie.revenue) : "-"}</Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default MovieCardInfor;
