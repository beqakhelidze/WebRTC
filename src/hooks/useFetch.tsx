import { useEffect, useState } from "react";
import axios from "axios";


const useFetch = <T,> ( url:string, initialState?:T) => {

    const [data, setData] = useState (null)
    const [error, setError] = useState (null)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        ; (async () => {
            try {
                setLoading(true)
                const { data } = await axios.get(url+initialState);
                setData(data)
            } catch (err:any) {
                setError(err.response.message)
            } finally {
                setLoading(false)
            }
        })()
    }, [initialState, url])

    return { data, error, loading }
}

export default useFetch;