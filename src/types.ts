export interface Options<T> {
  defaultValue?: T;
  auto?: boolean;
  errorCatch?: boolean;
}

export interface SendDataOptions {
  params?: string;
  data?: any;
}

export type CallFunction<T> = {
  (params?: string | undefined): Promise<T | undefined>;
  (sendOption?: SendDataOptions | undefined): Promise<T | undefined>;
};
