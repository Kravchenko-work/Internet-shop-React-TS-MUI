import React, {FC} from "react";
import {Skeleton} from "@mui/material";
import "../Product.scss"


const ProductSkeleton:FC = () => {
    return (
        <div>
            <Skeleton variant="text" sx={{ fontSize: '3rem' }} />
            <div className="card-top">
            </div>
            <div className="card-body">
                <div className="card-body__half">
                    <Skeleton variant="circular" height={350}/>
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                </div>
                <div className="card-body__half">
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