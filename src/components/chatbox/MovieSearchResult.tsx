import { Movie } from "../../types/movie.type";
import MovieSearchCard from "../movie/MovieSearchCard";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

type Props = {
  movies: Movie[] | null;
  query: string;
  handleClose: () => void;
  closeResult: () => void;
};

const MovieSearchResult = ({ query, movies, handleClose, closeResult }: Props) => {
  return (
    <>
      <div className="flex items-center gap-1 mb-4 pl-1">
        <IconButton aria-label="back" onClick={closeResult}>
          <ArrowBackIcon fontSize="inherit" />
        </IconButton>
        <h1 className="text-lg font-semibold">
          Search result for `<i>{query}</i>`
        </h1>
      </div>
      {movies && movies.length > 0 ? (
        <>
          {movies.map((movie) => (
            <div key={movie.id} onClick={handleClose}>
              <MovieSearchCard movie={movie} />
            </div>
          ))}
        </>
      ) : (
        <div className="py-2 text-xl font-semibold text-red-500 text-center">No Result Found</div>
      )}
    </>
  );
};

export default MovieSearchResult;
