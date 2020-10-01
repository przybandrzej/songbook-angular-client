export interface ApiError {
  status?: string;
  timestamp?: string;
  message?: string;
  subErrors?: SubError[];
}

export interface SubError {
  parameter: string;
  rejectedValue: string;
  message: string;
}
