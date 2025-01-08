const path = {
  HOME: "/",
  // Authentication
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  RESEND_EMAIL_VERIFYCATION: "/resend-email-verification",
  // Movies
  MOVIE_DETAILS: "/movie/:movieId",
  SEARCH_MOVIE: "/search",
  FULL_REVIEWS: "/movie/:movieId/reviews",
  // Actors
  PERSON_DETAILS: "/person/:personId",
  CAST: "cast",
  FULL_CAST: "/movie/:movieId/cast",
  // User Profile
  PROFILE: "/profile",
  FAVORITE: "/favorite",
  RATING: "/rating",
  WATCHLIST: "/watchlist",
  WATCHLIST_DETAIL: "/list/:watchlistId",
  WATCHLIST_EDIT: "/list/:watchlistId/edit",
  // CRUD
  NEW: "new",
  EDIT: "edit",
  DETAIL: ":watchlistId",
  // Not found
  OTHER: "*",
};

export default path;
