export interface BasicResponse {
  message: string;
  success: boolean;
}

export interface ResponseWithData<TData = unknown> extends BasicResponse {
  data?: TData;
}
