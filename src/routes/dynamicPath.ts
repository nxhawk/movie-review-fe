import path from "./path";

const dynamicPath = {
  MOVIE_DETAILS: (movieId: string | number) => path.MOVIE_DETAILS.replace(":movieId", movieId.toString()),
  PERSON_DETAILS: (personId: string | number) => path.PERSON_DETAILS.replace(":personId", personId.toString()),
  FULL_CAST: (movieId: string | number) => path.FULL_CAST.replace(":movieId", movieId.toString()),
  FULL_REVIEWS: (movieId: string | number) => path.FULL_REVIEWS.replace(":movieId", movieId.toString()),
  WATCHLIST_DETAIL: (watchlistId: string | number) =>
    path.WATCHLIST_DETAIL.replace(":watchlistId", watchlistId.toString()),
  WATCHLIST_EDIT: (watchlistId: string | number) => path.WATCHLIST_EDIT.replace(":watchlistId", watchlistId.toString()),
};

export default dynamicPath;
