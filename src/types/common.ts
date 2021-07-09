export interface ResponseType {
  type: string;
  data: any;
  status: string;
}

export interface FetchType {
  fetch: boolean;
  error: string;
}

export interface ResponseSuccessData {
  status: string;
  data: any;
}

export interface ResponseFailureData {
  status: string;
  result_code: number;
  error_msg: string;
}
