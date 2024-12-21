import { getYear, minutesToHours, format, differenceInYears } from "date-fns";

export const formatDate = (date: string) => {
  return format(new Date(date), "dd/MM/yyyy");
};

export const getYearByDate = (date: string) => {
  return getYear(date);
};

export const minToHour = (min: number) => {
  if (min < 60) return `${min}m`;
  const result = minutesToHours(min);
  return `${result}h ${min - result * 60}m`;
};

export const formatBirthDate = (dateString: string): string => {
  // Parse ngày từ chuỗi
  const date = new Date(dateString);
  // Định dạng ngày thành "MMMM d, yyyy"
  const formattedDate = format(date, "MMMM d, yyyy");
  return formattedDate;
};

export const getAge = (fromDateString: string, toDateString = ""): string => {
  const fromDate = new Date(fromDateString);
  const toDate = toDateString ? new Date(toDateString) : new Date();
  return `(${differenceInYears(toDate, fromDate)} years old)`;
};
