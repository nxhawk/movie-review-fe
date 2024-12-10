import path from "./path";

const dynamicPath = {
  MOVIE_DETAILS: (movieId: string | number) => path.MOVIE_DETAILS.replace(":movieId", movieId.toString()),
};

export default dynamicPath;
