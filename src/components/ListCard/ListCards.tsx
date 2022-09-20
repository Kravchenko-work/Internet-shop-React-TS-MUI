import React, {FC} from 'react';

import ProductCard from "../ProductCard/ProductCard";

import s from "./ListCard.module.scss";

import {ICard} from "../../types";
interface IListCard {
    list: ICard[];
}

const ListCards:FC<IListCard> = ({list}) => {
    return (
        <div className={s.container}>
            {list.map((item) => (
                <ProductCard key={item.id} card={item}/>
            ))}
        </div>
    );
};

export default ListCards;