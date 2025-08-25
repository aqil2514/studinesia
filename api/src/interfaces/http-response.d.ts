interface BasicResponse {
  success: boolean;
  message: string;
  status?: number;
}

interface ResponseWithData<TData = unknown> extends BasicResponse {
  data?: TData;
}
