import { Card, CardActionArea, Typography } from "@mui/material";
import { MovieTrailer } from "../../types/movie.type";
import { tmdbConfig } from "../../api/tmdb/tmdb-client";
import { Link } from "react-router-dom";
import dynamicPath from "../../routes/dynamicPath";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getCorrectId } from "../../utils/helper.ts";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import React, { useState } from "react";
import WatchTrailerDialog from "../dialog/WatchTrailerDialog.tsx";

const MovieRectangleCard = ({ movie }: { movie: MovieTrailer }) => {
  const formattedDate = React.useMemo(() => {
    const date = new Date(movie.release_date);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, [movie.release_date]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="p-1.5">
      <Card
        sx={{
          width: "300px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.5)",
          background: "#000",
          borderRadius: "15px",
          overflow: "hidden",
          position: "relative",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
        onClick={handleClickOpen}
      >
        <CardActionArea disableRipple sx={{ backgroundColor: "primary.main", position: "relative" }}>
          <div style={{ height: "180px", overflow: "hidden", position: "relative" }}>
            <LazyLoadImage
              alt={movie.title}
              src={`${tmdbConfig.imageOriginalURL}/${movie.backdrop_path}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.parentElement!.style.backgroundColor = "black";
              }}
            />
            <PlayCircleOutlineIcon
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "3rem",
                color: "white",
              }}
            />
          </div>
        </CardActionArea>
      </Card>
      <Link to={dynamicPath.MOVIE_DETAILS(getCorrectId(movie.tmdb_id, movie.id))}>
        <Typography
          noWrap
          variant="h5"
          title={movie.title}
          sx={{ color: "white", textAlign: "center", fontWeight: "bold", marginTop: "10px", fontSize: "medium" }}
        >
          {movie.title}
        </Typography>
        <Typography
          variant="body2"
          component="p"
          sx={{ color: "white", textAlign: "center", fontSize: "small", marginTop: "5px" }}
        >
          {formattedDate}
        </Typography>
      </Link>
      <WatchTrailerDialog movie={movie} open={open} onClose={handleClose} />
    </div>
  );
};

export default MovieRectangleCard;
