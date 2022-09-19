import {useEffect, useState} from "react";

import {typeLocalStorage} from "../types/index"

function useLocalStorage<T1,T2> (key:string, initialValue:T1):[T1, T2] {
    const[value, setValue] = useState(() => {
        const localStorageValue = localStorage.getItem(key);
        if (localStorageValue) {
            return JSON.parse(localStorageValue)
        } else {
            return initialValue
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key])

    return [value as T1, setValue as T2];
}


export default useLocalStorage;