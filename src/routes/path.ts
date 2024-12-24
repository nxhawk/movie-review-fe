const path = {
  HOME: "/",
  // Authentication
  LOGIN: "/login",
  REGISTER: "/register",
  PROFILE: "/profile",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  RESEND_EMAIL_VERIFYCATION: "/resend-email-verification",
  // Movies
  MOVIE_DETAILS: "/movie/:movieId",
  SEARCH_MOVIE: "/search",
  // Actors
  PERSON_DETAILS: "/person/:personId",
  CAST: "cast",
  FULL_CAST: "/movie/:movieId/cast",
  // Not found
  OTHER: "*",
};

export default path;
