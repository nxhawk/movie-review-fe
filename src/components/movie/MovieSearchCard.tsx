import { Card, CardActionArea, CardContent, CardMedia, Grid } from "@mui/material";
import { tmdbConfig } from "../../api/tmdb/tmdb-client";
import defaultImage from "../../assets/images/default_movie.jpg";
import { Movie } from "../../types/movie.type.ts";
import { getYearByDate } from "../../utils/helper.ts";
import React from "react";

const MovieSearchCard = ({ movie }: { movie: Movie }) => {
  const navigateToTarget = () => {
    window.location.href = `/movie/${movie.id}`;
  };
  const formattedDate = React.useMemo(() => {
    const date = new Date(movie.release_date);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, [movie.release_date]);

  return (
    <div className="max-h-fit w-2/3 mb-4">
      <Card
        sx={{
          boxShadow: "0 2px 8px rgba(0, 0, 0, .5)",
          background: "#dbdbdb",
          borderRadius: "10px",
        }}
      >
        <CardActionArea disableRipple onClick={navigateToTarget} sx={{ display: "flex", backgroundColor: "white" }}>
          <CardMedia
            component="img"
            title={movie.title}
            alt={movie.title}
            image={movie.poster_path ? `${tmdbConfig.imageOriginalURL}/${movie.poster_path}` : defaultImage}
            sx={{ width: 100, height: "auto", objectFit: "cover" }}
          />
          <CardContent sx={{ flex: 1, padding: 0, marginLeft: 2 }}>
            <Grid item xs={12} md={8} lg={9} padding={{ xs: 0, md: 0 }}>
              <div>
                <h1 className="text-sm md:text-2xl">
                  <span className="font-bold">{movie.title}</span>
                  &nbsp;
                  {movie.release_date && <span>({getYearByDate(movie.release_date)})</span>}
                </h1>
                {movie.release_date && (
                  <p className="text-xs md:text-md italic text-neutral-500">Release date: {formattedDate}</p>
                )}
              </div>
              {/* Overview */}
              <div className="flex-col gap-5 mt-2 hidden md:flex max-h-20">
                <div className="flex flex-col gap-2 text-xs md:text-sm text-ellipsis overflow-hidden ...">
                  <p>{movie.overview}</p>
                </div>
              </div>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default MovieSearchCard;
