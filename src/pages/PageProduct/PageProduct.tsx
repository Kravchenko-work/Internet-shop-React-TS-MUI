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

import s from "./PageProduct.module.scss";

import {IQuantityCardInCart, ICard} from "../../types/index";

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

const PageProduct:FC = () => {
    const navigate  = useNavigate();
    const [product, setProduct] = useState<ICard>();
    const [addedProduct, setAddedProduct] = useState(0);
    const [isShowErrorStock, setIsShowErrorStock] = useState<boolean>(false);
    const [isShowErrorNoAddedProduct, setIsShowErrorNoAddedProduct] = useState<boolean>(false);
    const [openSuccessfully, setOpenSuccessfully] = useState<boolean>(false);
    const [openImpossible, setOpenImpossible] = useState<boolean>(false);
    const params = useParams<typeParams>();
    const [{response, isLoading}, doFetch] = useFetch<ICard>(`/${params.id}`);
    const [quantitiesCardInCart, setQuantitiesCardInCart] = useLocalStorage<IQuantityCardInCart[]>('quantitiesCardInCart', []);

    const handlerAddCart = () => {
        if (!addedProduct || !product) {
            setIsShowErrorNoAddedProduct(true);
            return
        }

        setOpenSuccessfully(true);
        setQuantitiesCardInCart(getUpdatedProductsInCart(quantitiesCardInCart, product.id, addedProduct));
        setAddedProduct(0);
        setIsShowErrorStock(false);
    }

    const handlerIncreaseCount = (product:ICard) => {
        const count = getCountProductInCart(quantitiesCardInCart, product.id)

        if (product.stock > count + addedProduct) {
            setAddedProduct(addedProduct + 1);
            setIsShowErrorNoAddedProduct(false);
        } else {
            setIsShowErrorStock(true);
        }
    }

    const handlerReduceCount = () => {
        if (addedProduct) {
            setIsShowErrorStock(false);
        } else {
            setOpenImpossible(true);
        }
        setAddedProduct(Math.max(addedProduct - 1, 0));
    }

    const handleCloseSuccessfully = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSuccessfully(false);
    };

    const handleCloseImpossible = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenImpossible(false);
    };

    useEffect(() => {
        doFetch();
    }, []);

    useEffect(() => {
        if (!response) {
            return
        }

        setProduct(response);
    }, [response])

    return (
        <ThemeProvider theme={theme}>
            <div className={s.wrapper}>
                <div className={s.wrapperInner}>
                    <div className={s.card}>
                        {!product || isLoading ? (
                            <ProductSkeleton/>
                        ) : (
                            <>
                                <div className={s.cardTop}>
                                    <button onClick={() => navigate(-1)} className={s.cardTopButton}>
                                        <span><i className={clsx(s.fa, s.faArrowLeft)}></i></span>
                                    </button>
                                    <h3 className={s.cardTopTitle}>{product.category}</h3>
                                </div>
                                <div className={s.cardBody}>
                                    <div className={s.cardBodyHalf}>
                                        <div>
                                            <h3 className={s.cardBodyTitle}>{product.brand}</h3>
                                            <p className={s.cardBodySubtitle}>{product.title}</p>
                                            <p className={s.cardBodyPrice}>
                                                <span>${product.price}</span>
                                                ${currentPrice(product)}
                                            </p>
                                        </div>
                                        <div className={s.cardBodyImage}>
                                            <img src={product.thumbnail} alt=""/>
                                        </div>
                                    </div>
                                    <div className={s.cardBodyHalf}>
                                        <div className={s.cardBodyDescription}>
                                            {product.description}
                                        </div>
                                        <div className={clsx(s.cardBodyStock,!product.stock && s.cardBodyStockOut)}>
                                            In stock {product.stock}
                                        </div>
                                        <div className={s.cardBodyRating}>
                                            <Rating name="disabled" value={+product.rating.toFixed(1)} readOnly precision={0.1}/>
                                            <div>{product.rating}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className={s.cardBottomWrapper}>
                                    <div className={s.cardBottom}>
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
                                                <StyledBadge badgeContent={getCountProductInCart(quantitiesCardInCart, product.id) || 0} color="secondary">
                                                    <ShoppingCartIcon />
                                                </StyledBadge>
                                            </IconButton>
                                        </NavLink>
                                    </div>
                                    {
                                        isShowErrorStock && (
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
                                    {
                                        isShowErrorNoAddedProduct && (
                                            <Alert severity="info">
                                                <AlertTitle>Info</AlertTitle>
                                                You have 0 products selected!
                                            </Alert>
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
            <Snackbar open={openImpossible} autoHideDuration={6000} onClose={handleCloseImpossible}>
                <Alert onClose={handleCloseImpossible} severity="warning" sx={{ width: '100%' }}>
                    This operation impossible!
                </Alert>
            </Snackbar>
        </ThemeProvider>
    );
};

export default PageProduct;