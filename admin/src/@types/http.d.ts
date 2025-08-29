interface BasicResponse {
  success: boolean;
  message: string;
}

interface ResponseWithData<TData = unknown> extends BasicResponse {
  data?: TData;
}