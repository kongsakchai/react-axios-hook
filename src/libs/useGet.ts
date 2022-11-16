import axios from "axios";
import { useCallback, useMemo, useState } from "react";
import { Options, SendDataOptions, UseAxios } from "../../types";

const useGet = <T = any>(url: string, options?: Options<T>): UseAxios<T> => {

  const [data, setData] = useState<T | undefined>(options?.defaultValue);
  const [loading, setLoading] = useState<boolean>(false);
  const [err, setError] = useState<any>();

  async function callFunction(params?: string): Promise<T | undefined>;
  async function callFunction(sendOption?: SendDataOptions): Promise<T | undefined>;
  async function callFunction(sendData?: string | SendDataOptions): Promise<T | undefined> {

    setLoading(true);
    const params = typeof sendData == "string" ? sendData : sendData?.params ?? "";

    const resData = await axios.get(url + params).then((res) => {

      setData(res.data);
      setError(undefined);
      return res.data;

    }).catch((e) => {

      let data: T | undefined = undefined;
      setData((prev) => {
        if (!options?.errorValue)
          data = undefined;
        else if (options.errorValue == 'default')
          data = options.defaultValue;
        else if (options.errorValue == 'present')
          data = prev;
        else
          data = options.errorValue;
        return data;
      })

      setError(e);
      return data;
    });

    setLoading(false);
    return resData;
  }

  const call = useCallback(callFunction, []);
  return useMemo(() => [{ data, loading, err }, call,], [data, loading, err, call]);
};

export default useGet;
