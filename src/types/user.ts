export interface ConsultantCallStatus {
  [key: string]: CallStatus;
}

export interface CallStatus {
  number: string;
  time: number;
  type: string;
}