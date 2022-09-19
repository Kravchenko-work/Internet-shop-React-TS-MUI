import React, {FC, useEffect, useState} from 'react';
import {useParams, useNavigate, NavLink} from "react-router-dom";
import clsx from "clsx";
import {
    Alert,
    AlertTitle,
    Button,
    ButtonGroup,
    createTheme,
    IconButton,
    Rating,
    Snackbar,
    ThemeProvider
} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import ProductSkeleton from "./component/ProductSkeleton";
import useFetch from "../../hooks/useFetch";
import {currentPrice, getUpdatedProductsInCart, getCountProductInCart} from "../../utils";
import useLocalStorage from "../../hooks/useLocalStorage";

import "./Product.scss";

import {IProductInCart, ICard} from "../../types/index";

type typeParams = {
    id: string
}

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

const theme = createTheme({
    typography: {
        fontFamily: 'Raleway, Arial',
    },
});





const Product:FC = () => {
    const navigate  = useNavigate();
    const [product, setProduct] = useState<ICard | null>(null);
    const [addedProduct, setAddedProduct] = useState(0);
    const [isShowError, setIsShowError] = useState<boolean>(false);
    const [openSuccessfully, setOpenSuccessfully] = useState<boolean>(false);
    const params = useParams<typeParams>();
    const [{response, error, isLoading}, doFetch] = useFetch(`/${params.id}`);
    const [productsInCart, setProductsInCart] = useLocalStorage<IProductInCart[],
                                                                (val: IProductInCart[]) => void>('productsInCart', []);
    const handlerAddCart = () => {
        if (!addedProduct) {
            return
        }

        if (!product) {
            return
        }

        setOpenSuccessfully(true);
        setProductsInCart(getUpdatedProductsInCart(productsInCart, product.id, addedProduct));
        setAddedProduct(0);
        setIsShowError(false);
    }

    const handlerIncreaseCount = (product:ICard) => {
        const count = getCountProductInCart(productsInCart, product.id)

        if (product.stock > count + addedProduct) {
            setAddedProduct(addedProduct + 1)
        } else {
            setIsShowError(true);
        }
    }

    const handlerReduceCount = () => {
        if (addedProduct) {
            setIsShowError(false);
        }
        setAddedProduct(Math.max(addedProduct - 1, 0));
    }

    const handleCloseSuccessfully = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSuccessfully(false);
    };

    useEffect(() => {
        doFetch();
    }, []);

    useEffect(() => {
        if (!response) {
            return
        }
        const iCardResponse = response as ICard;
        setProduct(iCardResponse);
    }, [response])

    return (
        <ThemeProvider theme={theme}>
            <div className="wrapper">
                <div className="wrapper__inner">
                    <div className="card">
                        {!product || isLoading ? (
                            <ProductSkeleton/>
                        ) : (
                            <>
                                <div className="card-top">
                                    <button onClick={() => navigate(-1)} className="card-top__button">
                                        <span><i className="fa fa-arrow-left"></i></span>
                                    </button>
                                    <h3 className="card-top__title">{product.category}</h3>
                                </div>
                                <div className="card-body">
                                    <div className="card-body__half">
                                        <div>
                                            <h3 className="card-body__title">{product.brand}</h3>
                                            <p className="card-body__subtitle">{product.title}</p>
                                            <p className="card-body__price">
                                                <span>${product.price}</span>
                                                ${currentPrice(product)}
                                            </p>
                                        </div>
                                        <div className="card-body__image">
                                            <img src={product.thumbnail} alt=""/>
                                        </div>
                                    </div>
                                    <div className="card-body__half">
                                        <div className="card-body__description">
                                            {product.description}
                                        </div>
                                        <div className={clsx('card-body__stock',!product.stock && 'card-body__stock-out')}>
                                            In stock {product.stock}
                                        </div>
                                        <div className="card-body__rating">
                                            <Rating name="disabled" value={+product.rating.toFixed(1)} readOnly precision={0.1}/>
                                            <div>{product.rating}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-bottom__wrapper">
                                    <div className="card-bottom">
                                        <ButtonGroup>
                                            <Button
                                                aria-label="reduce"
                                                onClick={handlerReduceCount}
                                            >
                                                <RemoveIcon fontSize="small" />
                                            </Button>
                                            <Button
                                                aria-label="increase"
                                                onClick={() => handlerIncreaseCount(product)}
                                            >
                                                <AddIcon fontSize="small" />
                                            </Button>
                                        </ButtonGroup>
                                        <Button onClick={handlerAddCart} variant="contained" sx={{ width: 200 }}>Add to cart{addedProduct ? ` (${addedProduct})` : ''}</Button>
                                        <NavLink to='/cart'>
                                            <IconButton aria-label="cart">
                                                <StyledBadge badgeContent={getCountProductInCart(productsInCart, product.id) || 0} color="secondary">
                                                    <ShoppingCartIcon />
                                                </StyledBadge>
                                            </IconButton>
                                        </NavLink>
                                    </div>
                                    {
                                        isShowError && (
                                            product.stock ? (
                                                <Alert severity="info">
                                                    <AlertTitle>Info</AlertTitle>
                                                    The product is no longer in stock! Go to the shopping cart to place an order
                                                </Alert>
                                            ) : (
                                                <Alert severity="error">
                                                    <AlertTitle>The operation is not allowed</AlertTitle>
                                                    The product is not in stock
                                                </Alert>
                                            )
                                        )
                                    }
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <Snackbar open={openSuccessfully} autoHideDuration={6000} onClose={handleCloseSuccessfully}>
                <Alert onClose={handleCloseSuccessfully} severity="success" sx={{ width: '100%' }}>
                    Product was successfully added to the cart!
                </Alert>
            </Snackbar>
        </ThemeProvider>
    );
};

export default Product;