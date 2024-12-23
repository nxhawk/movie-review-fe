import { CutCredit, ListCutCredit, MovieCast, MovieCrew, MoviesOfActor } from "../types/movie.type";

export function transformToCutCreditList(data: MoviesOfActor): ListCutCredit[] {
  const groupedCredits: Record<string, CutCredit[]> = {};

  // Process cast group
  data.cast
    .filter((movie) => movie.title && movie.media_type === "movie")
    .sort((a, b) => {
      if (!a.release_date) return -1;
      if (a.release_date && b.release_date) {
        return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
      }
      return 0;
    })
    .forEach((castItem: MovieCast) => {
      const groupName = "Acting";
      if (!groupedCredits[groupName]) groupedCredits[groupName] = [];
      groupedCredits[groupName].push({
        ...(castItem as CutCredit),
      });
    });

  // Process crew group
  data.crew
    .filter((movie) => movie.title && movie.media_type === "movie")
    .sort((a, b) => {
      if (!a.release_date) return -1;
      if (a.release_date && b.release_date) {
        return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
      }
      return 0;
    })
    .forEach((crewItem: MovieCrew) => {
      const groupName = crewItem.department || "Crew";
      if (!groupedCredits[groupName]) groupedCredits[groupName] = [];
      groupedCredits[groupName].push({
        ...(crewItem as CutCredit),
      });
    });

  // Convert grouped credits into ListCutCredit array
  return Object.entries(groupedCredits).map(([name, credits]) => ({
    name,
    credits,
  }));
}
