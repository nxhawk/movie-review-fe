import { Typography } from "@mui/material";
import { ActorMovie } from "../../types/actor.type";
import { tmdbConfig } from "../../api/tmdb/tmdb-client";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import dynamicPath from "../../routes/dynamicPath";

type Props = {
  casts: ActorMovie[];
};

const ListCast = ({ casts }: Props) => {
  return (
    <div className="flex-1">
      {/* Header */}
      <div className="flex items-end gap-2">
        <Typography variant="h5">Cast</Typography>
        <Typography variant="h6" className="text-gray-500 font-bold">
          {casts.length}
        </Typography>
      </div>
      {/* List Cast */}
      {casts.map((cast) => (
        <div key={cast.id} className="flex items-center gap-5 my-3">
          <Link to={dynamicPath.PERSON_DETAILS(cast.id)}>
            <LazyLoadImage
              alt={cast.name}
              src={cast.profile_path ? `${tmdbConfig.imageW500URL}/${cast.profile_path}` : tmdbConfig.defaultCastImg}
              wrapperProps={{
                style: { transitionDelay: "1s" },
              }}
              className="w-16 h-16 object-cover rounded-lg"
            />
          </Link>
          <div>
            <Link to={dynamicPath.PERSON_DETAILS(cast.id)}>
              <Typography variant="body1" className="font-bold">
                {cast.name}
              </Typography>
            </Link>
            <Typography variant="body2" className="text-gray-500">
              {cast.character}
            </Typography>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListCast;
