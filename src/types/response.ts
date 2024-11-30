export type ErrorResponse = {
  statusCode: number;
  message: string;
  error?: string;
};

export type SuccessResponse<T> = {
  message: string;
  data: T;
};
