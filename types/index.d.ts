export interface Options<T> {
  defaultValue?: T;
  errorValue?: 'default' | 'present' | T;
}

export interface SendDataOptions {
  params?: string;
  data?: any;
}

export interface Result<T> {
  data?: T,
  loading: boolean,
  err: any
}

export type CallFunction<T> = {
  (params?: string | undefined): Promise<T | undefined>;
  (sendOption?: SendDataOptions | undefined): Promise<T | undefined>;
};

export type UseAxios<T> = [Result<T>, CallFunction<T>];