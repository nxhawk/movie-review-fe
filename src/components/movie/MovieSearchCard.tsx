import { Card, CardActionArea, CardContent, Grid } from "@mui/material";
import { tmdbConfig } from "../../api/tmdb/tmdb-client";
import { Movie } from "../../types/movie.type.ts";
import { getYearByDate } from "../../utils/dateFormat";
import React from "react";
import { Link } from "react-router-dom";
import dynamicPath from "../../routes/dynamicPath.ts";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getCorrectId } from "../../utils/helper.ts";

const MovieSearchCard = ({ movie }: { movie: Movie }) => {
  const formattedDate = React.useMemo(() => {
    const date = new Date(movie.release_date);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, [movie.release_date]);

  return (
    <Link to={dynamicPath.MOVIE_DETAILS(getCorrectId(movie.tmdb_id, movie.id))} className="w-full block mb-4 px-1">
      <Card
        sx={{
          boxShadow: "0 2px 8px rgba(0, 0, 0, .5)",
          background: "#dbdbdb",
          borderRadius: "10px",
        }}
      >
        <CardActionArea disableRipple sx={{ display: "flex", backgroundColor: "white", alignItems: "start" }}>
          <LazyLoadImage
            alt={movie.title}
            src={movie.poster_path ? `${tmdbConfig.imageOriginalURL}/${movie.poster_path}` : tmdbConfig.defaultMovieImg}
            style={{ width: 100, height: "auto", objectFit: "cover" }}
          />
          <CardContent sx={{ flex: 1, padding: 0, marginLeft: 1 }}>
            <Grid item xs={12} md={8} lg={9} padding={{ xs: 0, md: 0 }}>
              <div>
                <h1 className="text-sm md:text-md mt-1 lg:text-2xl">
                  <span className="font-bold">{movie.title}</span>
                  &nbsp;
                  {movie.release_date && <span>({getYearByDate(movie.release_date)})</span>}
                </h1>
                {movie.release_date && (
                  <p className="text-xs md:text-md italic text-neutral-500">Release date: {formattedDate}</p>
                )}
              </div>
              {/* Overview */}
              <div className="flex-col gap-5 mt-2 hidden sm:flex max-h-20">
                <div className="flex flex-col gap-2 text-sm md:text-sm text-ellipsis overflow-hidden ...">
                  <p className="pr-2">{movie.overview}</p>
                </div>
              </div>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default MovieSearchCard;
