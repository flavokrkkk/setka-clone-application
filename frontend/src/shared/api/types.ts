export type TypeSearchParam = {
  [key: string]:
    | string
    | number
    | boolean
    | undefined
    | Array<string | number | boolean | undefined>;
};

export interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
  params?: TypeSearchParam;
}

export type TypeRequestConfig<Params = undefined> = Params extends undefined
  ? { config?: RequestOptions }
  : { params: Params; config: RequestOptions };

export interface ApiResponse<T> {
  data: T;
  message: string;
  error: string;
  statusCode: number;
}
