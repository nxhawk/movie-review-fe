import { PersonDetail } from "../../types/person.type";
import { Link, useNavigate } from "react-router-dom";
import dynamicPath from "../../routes/dynamicPath";
import { Card, CardActionArea, CardContent, Grid } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { tmdbConfig } from "../../api/tmdb/tmdb-client";

const PersonSearchCard = ({ person }: { person: PersonDetail }) => {
  const navigate = useNavigate();

  const handleMovieClick = (movieId: string | number) => {
    navigate(dynamicPath.MOVIE_DETAILS(movieId));
  };

  return (
    <Link to={dynamicPath.PERSON_DETAILS(person.id)} className="max-h-fit w-full mb-4 px-3">
      <Card
        sx={{
          boxShadow: "0 2px 8px rgba(0, 0, 0, .5)",
          background: "#dbdbdb",
          borderRadius: "10px",
        }}
      >
        <CardActionArea disableRipple sx={{ display: "flex", backgroundColor: "white", alignItems: "start" }}>
          <LazyLoadImage
            alt={person.name}
            src={
              person.profile_path ? `${tmdbConfig.imageOriginalURL}/${person.profile_path}` : tmdbConfig.defaultMovieImg
            }
            style={{ width: 100, height: "auto", objectFit: "cover" }}
          />
          <CardContent sx={{ flex: 1, padding: 0, marginLeft: 1 }}>
            <Grid item xs={12} md={8} lg={9} padding={{ xs: 0, md: 0 }}>
              <div>
                <h1 className="text-sm md:text-md lg:text-2xl mt-1">
                  <span className="font-bold">{person.name}</span>
                </h1>
                <p className="text-xs md:text-md italic text-neutral-500">{person.known_for_department}</p>
                <p className="text-xs md:text-md italic text-neutral-500">Popularity: {person.popularity}</p>
              </div>
              {/* Overview */}
              <div className="flex-col gap-5 mt-2 flex max-h-20">
                <div className="flex flex-col gap-2 text-sm md:text-sm text-ellipsis overflow-hidden ...">
                  <p className="pr-2">
                    Know for:{" "}
                    {person.known_for &&
                      person.known_for.map((movie, index) => (
                        <span
                          key={movie.id}
                          onClick={() => handleMovieClick(movie.id)}
                          className="text-blue-500 cursor-pointer"
                        >
                          {movie.title ? movie.title : movie.original_title}
                          {index < person.known_for.length - 1 && ", "}
                        </span>
                      ))}
                  </p>
                </div>
              </div>
            </Grid>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default PersonSearchCard;
