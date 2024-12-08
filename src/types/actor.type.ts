import { Movie } from "./movie.type";

export type Actor = {
  id: number;
  biography: string;
  birthday: string;
  gender: 1 | 2 | 3; // 1. Female; 2. Male; 3. Non-binary
  name: string;
  place_of_birth: string;
  profile_path: string;
  adult: boolean;
  also_known_as: string[];
  deathday: null;
  homepage: null;
  known_for_department: string;
  popularity: number;
};

export type MoviesOfActor = {
  cast: Movie[];
  id: number;
};
