import {Control} from "react-hook-form";
import React from "react";

export interface ICard {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

export interface ICardInCart extends ICard{
    count: number;
}
// Тип any протипивизировать, временная заглушка any
// export type typeResponseListCards = {products: ICard[]};
// export type typeResponseCategories = string[];

export type typeError = {
    message: string
} | null

export type typeFetch = (url?:string) => [
    {
        isLoading: boolean,
        response: any,
        error: typeError
    },
    () => void
];


export type typeLocalStorage = (key:string, initialValue?:string) => [
    string,
    (val: string) => void
]


export interface IProductInCart {
    id: number,
    count: number
}


//I validation on order:
export interface IFormPersonalData {
    name: string
    email: string
    phone: string
}

export interface IMuiInput {
    register: any
    error?: boolean
    helperText?: string | undefined
    label: string
    onInput?: (val:React.ChangeEvent<HTMLInputElement>) => void
    onFocus?: (val: React.FocusEvent<HTMLInputElement>) => void
}

export interface IMuiPhone {
    control: Control<IFormPersonalData>
}


export interface IFormCreditCard {
    cvc: string
    expiry: string
    name: string
    number: string
    expiryyear: string
}

interface Ioption {
    value: string
    label: string
}

export interface IMuiSelect {
    options: Ioption[];
    register: any
    error?: boolean
    helperText?: string | undefined
    label: string
    onInput?: (val:React.ChangeEvent<HTMLInputElement>) => void
    onFocus?: (val: React.FocusEvent<HTMLSelectElement>) => void
    defaultValue: string
}

export interface IFormAddress {
    address: string
}