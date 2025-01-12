/* eslint-disable no-unused-vars */
import { MovieDetail } from "./movie.type";

export type IRouteNavigation = {
  route: string;
};

export type ILlmSearch = {
  data: MovieDetail[];
  message: string;
};

export enum ETabToggle {
  AI_NAVIGATION = 0,
  LLM_SEARCH = 1,
}
