import React, {FC} from "react";
import {Skeleton} from "@mui/material";
import "../Product.module.scss"

import s from "./../Product.module.scss"


const ProductSkeleton:FC = () => {
    return (
        <div>
            <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
            <div className={s.cardTop}>
            </div>
            <div className={s.cardBody}>
                <div className={s.cardBodyHalf}>
                    <Skeleton variant="circular" height={350}/>
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                </div>
                <div className={s.cardBodyHalf}>
                    <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
                    <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                    <Skeleton variant="text" sx={{ fontSize: '4rem' }} />
                </div>
            </div>
            <Skeleton variant="text" sx={{ fontSize: '4rem' }} />
        </div>
    );
};

export default ProductSkeleton;