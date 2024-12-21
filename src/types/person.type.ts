import { GenderType } from "./actor.type";

export type PersonDetail = {
  id: number;
  imdb_id: string;
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string | null;
  deathday: string | null;
  gender: GenderType;
  known_for_department: string;
  name: string;
  place_of_birth: string | null;
  popularity: number;
  profile_path: string;
};
