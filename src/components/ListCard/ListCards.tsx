import React, {FC} from 'react';

import Card from "../Card/Card";

import s from "./ListCard.module.scss";

import {IListCard} from "../../types";

const ListCards:FC<IListCard> = ({list}) => {
    return (
        <div className={s.container}>
            {list.map((item) => (
                <Card key={item.id} card={item}/>
            ))}
        </div>
    );
};

export default ListCards;