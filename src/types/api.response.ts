export interface ApiResponse<T> {
  code: string;
  data: T;
  message: string;
}

export interface ApiExceptionResponse {
  errCode: string;
  errMsg: string;
  responseTime: string;
}
