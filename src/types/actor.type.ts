// 1. Female;           2. Male;            3. Non-binary
export type GenderType = 1 | 2 | 3;

export type CrewMovie = {
  id: number;
  gender: GenderType;
  name: string;
  original_name: string;
  profile_path: string;
  credit_id: string;
  adult: boolean;
  known_for_department: string;
  popularity: number;
  department: string;
  job: string;
};

export type ActorMovie = {
  id: number;
  cast_id: number;
  gender: GenderType;
  name: string;
  original_name: string;
  profile_path: string;
  character: string;
  credit_id: string;
  order: number;
  adult: boolean;
  known_for_department: string;
  popularity: number;
};

export type Actor = {
  id: number;
  biography: string;
  birthday: string;
  gender: GenderType;
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

export type ActorsOfMovie = {
  id: number;
  cast: ActorMovie[];
  crew: CrewMovie[];
};
