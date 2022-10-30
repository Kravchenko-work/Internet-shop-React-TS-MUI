import {ICard, IQuantityCardInCart, ICardInCart} from "../types";

export const API_KEY = process.env.REACT_APP_API_KEY

export const currentPrice = (card: ICard) => {
    return Number((card.price * (1 - (card.discountPercentage / 100))).toFixed(2))
}

type typeIsErrorNotElement = (message: string) => Boolean;
export const isErrorNotElement:typeIsErrorNotElement = (message) => {
    let regExp = /Product with id '\w+' not found/;
    return regExp.test(message);
}

export const getUpdatedProductsInCart = (quantitiesCardInCart: IQuantityCardInCart[], id: number, quantityCard:number) => {
    let arr = [...quantitiesCardInCart];
    let index = arr.findIndex((item) => (
        item.id === id
    ));
    if (index !== -1) {
        arr[index].count += quantityCard;
    } else {
        arr = [
            ...arr,
            {
                id: id,
                count: quantityCard
            }
        ]
    }
    return arr;
};

export const getCountProductInCart = (quantitiesCardInCart: IQuantityCardInCart[], id: number) => {
    let index = quantitiesCardInCart.findIndex((item) => (
        item.id === id
    ));

    return quantitiesCardInCart[index]?.count || 0;
}

export const getListAddedCartFromGetListCard = (listCard: ICard[], quantitiesCardInCart: IQuantityCardInCart[]):ICardInCart[] => {
    let listCardInCartWithQuantity:ICardInCart[] = [];

    listCard.forEach((item) => {
        let product = quantitiesCardInCart.find((itemProduct) => {
            return item.id === itemProduct.id;
        })
        if (product) {
            listCardInCartWithQuantity.push({...item, count:product.count})
        }
    })

    return listCardInCartWithQuantity;
}



export const calcPriceOneCardAllCount = (cardInCart: ICardInCart) => {
    return (currentPrice(cardInCart) * cardInCart.count)
}

export const calcPriceAllCardAllCount = (allCardsInCart: ICardInCart[]) => {
    return allCardsInCart.reduce((accumulator, itemCardInCart) => {
        return accumulator + currentPrice(itemCardInCart) * itemCardInCart.count
    }, 0)
}