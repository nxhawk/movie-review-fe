import { Box, Card, CardActionArea, CardContent, Typography } from "@mui/material";
import React from "react";
import { Movie } from "../../types/movie.type.ts";
import UserScore from "./UserScore.tsx";
import { tmdbConfig } from "../../api/tmdb/tmdb-client";
import { Link } from "react-router-dom";
import dynamicPath from "../../routes/dynamicPath.ts";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getCorrectId } from "../../utils/helper.ts";

const MovieSimpleCard = ({ movie }: { movie: Movie }) => {
  const formattedDate = React.useMemo(() => {
    const date = new Date(movie.release_date);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, [movie.release_date]);

  return (
    <div className="py-3 px-1 min-w-60">
      <Link to={dynamicPath.MOVIE_DETAILS(getCorrectId(movie.tmdb_id, movie.id))} title={movie.title}>
        <Card
          sx={{
            boxShadow: "0 2px 8px rgba(0, 0, 0, .5)",
            background: "#dbdbdb",
            overflow: "hidden",
            borderRadius: "15px",
            position: "relative",
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.06)",
            },
          }}
        >
          <CardActionArea disableRipple sx={{ backgroundColor: "primary.main" }}>
            <div style={{ height: "calc(140px * 2.2)", overflow: "hidden" }}>
              <LazyLoadImage
                alt={movie.title}
                src={
                  movie.poster_path ? `${tmdbConfig.imageOriginalURL}/${movie.poster_path}` : tmdbConfig.defaultMovieImg
                }
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <CardContent>
              <Box sx={{ position: "absolute", top: "270px", left: "5px" }}>
                <UserScore point={Math.round((movie.vote_average ? movie.vote_average : 0) * 10)} />
              </Box>
              <Typography
                noWrap
                variant="h5"
                title={movie.title}
                sx={{ color: "white", fontWeight: "bold", marginTop: "10px", fontSize: "medium" }}
              >
                {movie.title}
              </Typography>
              <Typography variant="body2" component="p" sx={{ color: "gray", fontSize: "small", marginTop: "5px" }}>
                {formattedDate}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </div>
  );
};

export default MovieSimpleCard;
