import React, {FC} from 'react';
import {IconButton, Rating} from "@mui/material";

import {currentPrice} from "../../utils";

import s from "./ProductCard.module.scss";

import {ICard as iCardFromTypes, IProductInCart} from "../../types";
import {NavLink} from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {styled} from "@mui/material/styles";
import Badge, {BadgeProps} from "@mui/material/Badge";
import useLocalStorage from "../../hooks/useLocalStorage";

interface ICard {
    card: iCardFromTypes
}

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

const ProductCard:FC<ICard> = ({card}) => {
    const [productsInCart, setProductsInCart] = useLocalStorage<IProductInCart[],
        (val: IProductInCart[]) => void>('productsInCart', []);


    const index:number = productsInCart.findIndex((item) => {
        return item.id === card.id
    })

    return (
        <div className={s.productCard}>
            {card.discountPercentage && <div className={s.badge}>Hot, {Math.trunc(card.discountPercentage)} %</div>}
            <NavLink to={`product/${card.id}`}>
                <div className={s.productTumb} style={{background: `#fff url(${card.thumbnail}) center / contain no-repeat `}}>
                </div>
            </NavLink>

             <div className={s.productDetails}>
                 <div className={s.productCatagory}>
                     {card.brand} | {card.category}
                 </div>
                 <h4>
                     <NavLink to={`product/${card.id}`}>
                         {card.title}
                     </NavLink>
                 </h4>
                  <Rating name="disabled" value={+card.rating.toFixed(1)} readOnly precision={0.1}/>
                 <div className={s.productBottomDetails}>
                     <div className={s.productPrice}><span>${card.price}</span>${currentPrice(card)}</div>
                     <NavLink to='/cart'>
                         <IconButton aria-label="cart">
                             <StyledBadge badgeContent={productsInCart[index]?.count || 0} color="secondary">
                                 <ShoppingCartIcon />
                             </StyledBadge>
                         </IconButton>
                     </NavLink>
                 </div>
                 <div>
                     {card.description}
                 </div>
             </div>
        </div>
    );
};

export default ProductCard;