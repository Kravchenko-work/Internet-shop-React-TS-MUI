import React, {FC} from 'react';

import ProductCard from "../ProductCard/ProductCard";

import s from "./ListCard.module.scss";

import {ICard} from "../../types";
import {Alert, Stack} from "@mui/material";
interface IListCard {
    list: ICard[];
}

const ListCards:FC<IListCard> = ({list}) => {
    if (list.length < 1) {
        return (
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Alert severity="info">Product not found!</Alert>
            </Stack>
        )
    }

    return (
        <div className={s.container}>
            {list.map((item) => (
                <ProductCard key={item.id} card={item}/>
            ))}
        </div>
    );
};

export default ListCards;