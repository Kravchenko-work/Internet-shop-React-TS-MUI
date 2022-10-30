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

export interface IListCard {
    list: ICard[];
}

export interface ICardInCart extends ICard {
    count: number;
}

export interface IQuantityCardInCart {
    id: number,
    count: number
}

//I validation on order:
export interface IFormPersonalData {
    name: string
    email: string
    phone: string
}

export interface IFormCreditCard {
    cvc: string
    expiry: string
    name: string
    number: string
    expiryyear: string
}

export interface IFormAddress {
    address: string
}