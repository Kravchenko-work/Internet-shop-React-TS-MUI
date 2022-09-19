import {ICard, IProductInCart, ICardInCart} from "../types";
import {forEach} from "react-bootstrap/ElementChildren";

export const API_KEY = process.env.REACT_APP_API_KEY

export const currentPrice = (card: ICard) => {
    return Number((card.price * (1 - (card.discountPercentage / 100))).toFixed(2))
}

type typeIsErrorNotElement = (message: string) => Boolean;
export const isErrorNotElement:typeIsErrorNotElement = (message) => {
    let regExp = /Product with id '\w+' not found/;
    return regExp.test(message);
}

export const alphabeticallySortingCart = (listCard: ICard[]) => {
    listCard.sort();
    return listCard;
}

export const getUpdatedProductsInCart = (productsInCart: IProductInCart[], id: number, countProduct:number) => {
    let arr = [...productsInCart];
    let index = arr.findIndex((item) => (
        item.id === id
    ));
    if (index !== -1) {
        arr[index].count += countProduct;
    } else {
        arr = [
            ...arr,
            {
                id: id,
                count: countProduct
            }
        ]
    }
    return arr;
};

export const getCountProductInCart = (productsInCart: IProductInCart[], id: number) => {
    let index = productsInCart.findIndex((item) => (
        item.id === id
    ));

    return productsInCart[index]?.count || 0;
}

export const getListAddedCartFromGetListCard = (listCard: ICard[], productsInCart: IProductInCart[]) => {
    let arrIndexes:number[] = [];
    for (let item of listCard) {
        arrIndexes.push(item.id);
    }
    let listAddedProduct:ICard[] = listCard.filter((itemListCard) => (
        arrIndexes.includes(itemListCard.id)
    ));

    listAddedProduct.map((item) => {
        let product:IProductInCart | undefined = productsInCart.find((itemProduct) => {
            return item.id === itemProduct.id;
        })

        return item
    })

    let returnArray:ICardInCart[] = [];

    listAddedProduct.forEach((item) => {
        let product:IProductInCart | undefined = productsInCart.find((itemProduct) => {
            return item.id === itemProduct.id;
        })
        if (product) {
            returnArray.push({...item, count:product.count})
        }
    })

    return returnArray;
}



export const calcPriceOneCardAllCount = (cardInCart: ICardInCart) => {
    return (currentPrice(cardInCart) * cardInCart.count)
}

export const calcPriceAllCardAllCount = (allCardsInCart: ICardInCart[]) => {
    return allCardsInCart.reduce((accumulator, itemCardInCart) => {
        return accumulator + currentPrice(itemCardInCart) * itemCardInCart.count
    }, 0)
}