import React, {FC, useCallback, useEffect, useState} from 'react';
import axios from "axios";
import {typeFetch, typeError} from "../types";

const useFetch:typeFetch = (url = "") => {
    const dynamicUrl = `https://dummyjson.com/products${url}`;
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState<any>(null);
    const [error, setError] = useState<typeError>(null);

    const doFetch = useCallback(() => {
        setIsLoading(true);
    }, [])

    async function fetch() {
        try {
            const response = await axios.get<any>(dynamicUrl);
            setResponse(response.data);
        } catch (error) {
            setError(error as typeError);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (!isLoading) {
            return;
        }

        fetch();
    }, [isLoading])

    return [{isLoading, response, error}, doFetch];
}

export default useFetch;