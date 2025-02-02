import MovieSearchCard from "../movie/MovieSearchCard.tsx";
import { Movie } from "../../types/movie.type.ts";

const SearchMoviesList = ({ movies }: { movies: Movie[] }) => {
  return (
    <div className="w-full flex flex-wrap justify-center">
      {movies && movies.length > 0 ? (
        movies.map((movie) => <MovieSearchCard key={movie.tmdb_id} movie={movie} />)
      ) : (
        <p className="mb-5 min-h-60">No movies found. Please try a different search.</p>
      )}
    </div>
  );
};

export default SearchMoviesList;
