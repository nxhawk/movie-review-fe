import { Card, CardContent, Typography } from "@mui/material";
import { ActorMovie } from "../../types/actor.type";
import { tmdbConfig } from "../../api/tmdb/tmdb-client";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import dynamicPath from "../../routes/dynamicPath";

type Props = {
  actor: ActorMovie;
};

const MovieActorCredit = ({ actor }: Props) => {
  return (
    <Card variant="outlined" sx={{ bgColor: "white", borderRadius: "10px" }}>
      <Link to={dynamicPath.PERSON_DETAILS(actor.id)} title={actor.name}>
        <LazyLoadImage
          alt={actor.name}
          src={actor.profile_path ? `${tmdbConfig.imageW500URL}/${actor.profile_path}` : tmdbConfig.defaultCastImg}
          className="h-60 w-full object-cover"
        />
      </Link>
      <CardContent className="h-32">
        <Link to={dynamicPath.PERSON_DETAILS(actor.id)}>
          <Typography fontWeight={"bold"} variant="body1" className="hover:text-gray-500">
            {actor.name}
          </Typography>
        </Link>
        <Typography variant="body2">{actor.character}</Typography>
      </CardContent>
    </Card>
  );
};

export default MovieActorCredit;
