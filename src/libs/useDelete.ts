import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react"
import { CallFunction, Options, SendDataOptions } from "./types";

const useGet = <T>(url: string, options?: Options<T>): [T | undefined,boolean, Error | undefined, CallFunction<T>] => {

    const [result, setResult] = useState<T | undefined>(options?.defaultValue);
    const [loading, setLoading] = useState<boolean>(false);
    const [err, setError] = useState<any>();
    let once = false;

    async function callFunction(params?: string): Promise<T | undefined>;
    async function callFunction(sendOption?: SendDataOptions): Promise<T | undefined>;
    async function callFunction(sendData?: string | SendDataOptions): Promise<T | undefined> {

        setLoading(true);
        const params = (typeof sendData == 'string') ? sendData : (sendData?.params ?? '')

        const resData = await axios.delete(url + params).then((res) => {
            setResult(res.data);
            return res.data;
        }).catch((e) => {
            if (!options?.errorCatch) setResult(options?.defaultValue);
            console.error(e);
            setError(e);
            return undefined;
        });
        setLoading(false);
        return resData;

    }

    const call = useCallback(callFunction, [])

    useEffect(() => {
        if (once) return;
        if (!options?.auto) return;

        call();

        return () => {
            once = true;
        }
    }, [])


    return useMemo(() => [result, loading, err, call], [result, loading, err, call]);
}

export default useGet;