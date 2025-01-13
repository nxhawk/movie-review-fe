import { Genre, Movie, Video } from "../types/movie.type";
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

export function isLightColor(color: string): boolean {
  let r, g, b;

  // Check the format of the color, HEX or RGB?
  if (color.match(/^rgb/)) {
    // If HEX --> store the red, green, blue values in separate variables
    const rgb = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
    if (!rgb) return false;

    r = parseInt(rgb[1], 10);
    g = parseInt(rgb[2], 10);
    b = parseInt(rgb[3], 10);
  } else {
    // If RGB --> Convert it to HEX: http://gist.github.com/983661
    const hexColor = +("0x" + color.slice(1).replace(/./g, color.length < 5 ? "$&$&" : "$&"));

    r = (hexColor >> 16) & 255;
    g = (hexColor >> 8) & 255;
    b = hexColor & 255;
  }

  // HSP equation from http://alienryderflex.com/hsp.html
  const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

  // Using the HSP value, determine whether the color is light or dark
  // > 127.5 is 'light', <= 127.5 is 'dark'

  return hsp > 127.5;
}

export function getRatingTextColor(point: number): string {
  if (point === 0) return "#032541";
  if (point < 50) return "#db2360";
  else if (point < 70) return "#d2d531";
  return "#21d07a";
}

export function getCorrectId(tmdbId: number | string | undefined, id: number | string) {
  return tmdbId ? tmdbId : id;
}

export const buildQueryString = (movie: Movie) => {
  const { genres, release_date, keywords } = movie;

  let query = "";

  if (genres && genres.length > 0) {
    query += `${genres.map((genre: Genre) => genre.name).join(" and ")} movies, `;
  }

  if (keywords && keywords.length > 0) {
    query += `with keywords like ${keywords.map((keyword) => keyword.name).join(" and ")}, `;
  }

  if (release_date && release_date.length > 0) {
    query += `released in ${new Date(release_date).getFullYear()}, `;
  }

  query += `not have tmdb id: ${movie.tmdb_id} or id: ${movie.id}`;

  return query.trim();
};
