import React, {FC} from 'react';

import ProductCard from "../ProductCard/ProductCard";

import s from "./ListCard.module.scss";

import {IListCard} from "../../types";

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