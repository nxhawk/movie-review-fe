import { Grid } from "@mui/material";
import { tmdbConfig } from "../../api/tmdb/tmdb-client";
import { MovieDetail } from "../../types/movie.type";
import { getYearByDate, minToHour } from "../../utils/helper";
import UserScore from "./UserScore";
import UserAction from "./UserAction";

type Props = {
  movie: MovieDetail;
};

const MovieCardInfor = ({ movie }: Props) => {
  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${tmdbConfig.imageOriginalURL}/${movie.backdrop_path})` }}
    >
      <div className="backdrop-blur-md text-white">
        <Grid container justifyContent="center" padding={2}>
          <Grid item xs={12} md={4} lg={3} padding={3}>
            <img
              src={`${tmdbConfig.imageW500URL}/${movie.poster_path}`}
              alt={movie.title}
              className="rounded-lg shadow-lg"
            />
          </Grid>
          <Grid item xs={12} md={8} lg={9} padding={{ xs: 0, md: 2 }}>
            <div>
              <h1 className="text-4xl font-bold">
                {movie.title}&nbsp;
                <span className="text-gray-300">({getYearByDate(movie.release_date)})</span>
              </h1>
              <div className="flex flex-wrap gap-2 mt-1">
                <p>{movie.release_date}</p>
                <div className="flex gap-1">
                  &#x1F784;
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
              <UserScore showText={true} point={movie.vote_average * 10} />
            </div>
            <UserAction />
            {/* Tag line */}
            <div className="text-gray-300 text-lg italic">{movie.tagline}</div>
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
