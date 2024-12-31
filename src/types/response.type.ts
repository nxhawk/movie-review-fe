export type ErrorResponse = {
  statusCode: number;
  message: string;
  error?: string;
};

export type SuccessResponse<T> = {
  message: string;
  data: T;
};

export type Pagination<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};
