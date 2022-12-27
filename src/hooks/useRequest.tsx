import { useState } from "react";
import axios from "axios";

interface Request{
    method: string;
    url: string;
};


const useRequest = ({method, url}: Request) => {

    const [data, setData] = useState<{
        data: any,
        status: number,
    } | undefined>(undefined)
    const [error, setError] = useState<{
        message: string,
        status: number
    } | undefined>(undefined)
    const [loading, setLoading] = useState(false);

    const sendRequest = async (data: any) => {
        setLoading(true);
        await axios({
            method: method,
            url: url,
            data: data,
        }).then((response) => {
            setData({
                data: response.data,
                status: response.status,
            });
            setError(undefined);
            setLoading(false);
        }).catch((error) => {
            setError({
                message: error.response.data.message,
                status: error.status,
            });
            setData(undefined);
            setLoading(false);
        });
    }

    return { payload: { data, error, loading }, sendRequest };
};

export default useRequest;