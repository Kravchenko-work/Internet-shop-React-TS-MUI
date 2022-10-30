import React, {FC} from "react";
import {Skeleton} from "@mui/material";

import sCard from "../../../components/Card/Card.module.scss";
import sListCard from "./../../../components/ListCard/ListCard.module.scss";


interface IShopSkeleton {
    count: number;
}

const ShopSkeleton:FC<IShopSkeleton> = ({count}) => {
    return (
        <div className={sListCard.container}>
            {
                Array(count).fill(0).map((_, index) => (
                    <div key={index} className={sCard.productCard} style={{padding: '30px'}}>
                        <Skeleton variant="circular" height={200}/>
                        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                        <Skeleton variant="text" sx={{ fontSize: '1.2rem' }} />
                        <Skeleton variant="text" sx={{ fontSize: '0.8rem' }} />
                        <Skeleton variant="text" sx={{ fontSize: '4rem' }} />
                    </div>
                ))
            }
        </div>
    );
};

export default ShopSkeleton;