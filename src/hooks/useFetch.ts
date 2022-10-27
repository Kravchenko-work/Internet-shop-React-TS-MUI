import axios from "axios";
import {useCallback, useEffect, useState} from 'react';
import {typeReturnFetch, typeError} from "../types";

const useFetch = <T>(
        url: string = "",
    ):typeReturnFetch<T> => {
    const dynamicUrl = `https://dummyjson.com/products${url}`;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [response, setResponse] = useState<T>();
    const [error, setError] = useState<typeError>(null);

    useEffect(() => {
        if (!isLoading) {
            return;
        }

        fetch();
    }, [isLoading])

    const doFetch = useCallback(() => {
        setIsLoading(true);
    }, [])

    const fetch = () => {
        axios({
                method: 'GET',
                url: dynamicUrl
        })
            .then((response) => {
                setResponse(response.data);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => setIsLoading(false));
    }

    return [{isLoading, response, error}, doFetch];
}

export default useFetch;