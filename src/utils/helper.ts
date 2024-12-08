import { getYear, minutesToHours } from "date-fns";

export const removeAllToken = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const setToken = (accessToken: string, refreshToken: string) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

export const getYearByDate = (date: string) => {
  return getYear(date);
};

export const minToHour = (min: number) => {
  const result = minutesToHours(min);
  return `${result}h ${min - result * 60}m`;
};
