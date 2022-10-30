import React from "react";
export type typeError = {
    message: string
} | null

export type typeReturnFetch<T> = [
    {
        isLoading: boolean,
        response: T | undefined,
        error: typeError
    },
    () => void
];