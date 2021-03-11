export interface DynamicMapType {
  [key: string]: any;
}

export interface ResponseType {
  type: string;
  data: any;
  status: string;
}

export interface FetchType {
  fetch: boolean;
  error: string;
}
