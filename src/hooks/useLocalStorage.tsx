import {useEffect, useState} from "react";

function useLocalStorage<T1> (key:string, initialValue:T1):[T1, ((val: T1) => void)] {
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

    return [value as T1, setValue as (val: T1) => void];
}


export default useLocalStorage;