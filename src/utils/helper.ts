import { Video } from "../types/movie.type";
import { CrewMovie, GenderType } from "../types/actor.type";

export const removeAllToken = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const setToken = (accessToken: string, refreshToken: string) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

export function getColorByPoint(point: number) {
  if (point === 0)
    return {
      track: "#666666",
      bar: "#d4d4d4",
    };
  else if (point < 50)
    return {
      track: "#571435",
      bar: "#db2360",
    };
  else if (point < 70)
    return {
      track: "#423d0f",
      bar: "#d2d531",
    };
  return {
    track: "#204529",
    bar: "#21d07a",
  };
}

export const getTeaserYoutubeKey = (videos: Video[]) => {
  const trailer = videos.find((video) => video.type === "Trailer" && video.site === "YouTube");
  if (trailer) return trailer;

  const teaser = videos.find((video) => video.type === "Teaser" && video.site === "YouTube");
  if (teaser) return teaser;

  const clip = videos.find((video) => video.type === "Clip" && video.site === "YouTube");
  if (clip) return clip;

  return videos[0] || "";
};

export const groupByDepartment = (items: CrewMovie[]) => {
  return items.reduce(
    (result, item) => {
      if (!result[item.department]) {
        result[item.department] = [];
      }
      result[item.department].push(item);
      return result;
    },
    {} as Record<string, CrewMovie[]>,
  );
};

export const showGenderText = (gender: GenderType) => {
  switch (gender) {
    case 1:
      return "Female";
    case 2:
      return "Male";
    default:
      return "Non-binary";
  }
};
