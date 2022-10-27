import React, {FC, useEffect, useState} from 'react';
import {
    Backdrop,
    Box,
    Button,
    ButtonGroup, CircularProgress,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";
import {NavLink, useNavigate} from "react-router-dom";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from '@mui/icons-material/Delete';

import useFetch from "../../hooks/useFetch";
import useLocalStorage from "../../hooks/useLocalStorage";
import {
    calcPriceOneCardAllCount,
    currentPrice,
    getListAddedCartFromGetListCard, getUpdatedProductsInCart
} from "../../utils";

import "./Cart.scss";

import {ICard, ICardInCart, IProductInCart} from "../../types";
import FormPay from "../../components/FormPay/FormPay";


const Cart:FC = () => {
    const navigate = useNavigate();
    const [listAddedCart, setListAddedCart] = useState<ICardInCart[]>([]);
    const [open, setOpen] = useState(false);
    const [{response, isLoading}, doFetch] = useFetch<{products: ICard[]}>();
    const [productsInCart, setProductsInCart] = useLocalStorage<IProductInCart[],
        (val: IProductInCart[]) => void>('productsInCart', []);

    const handlerIncreaseCount = (addedCart:ICardInCart) => {
        if (addedCart.stock > addedCart.count) {
            setProductsInCart(getUpdatedProductsInCart(productsInCart, addedCart.id, 1));
        } else {
            // setIsShowError(true);
        }
    }

    const handlerReduceCount = (addedCart:ICardInCart) => {
        if (addedCart.count === 1) {
            // setIsShowError(false);
            return
        }
        setProductsInCart(getUpdatedProductsInCart(productsInCart, addedCart.id, -1));
    }

    const handleClickDelete = () => {
        setOpen(true);
    }

    const handleCloseDelete = () => {
        setOpen(false);
    };

    const handleDeleteProductsInCart = (addedCart:ICardInCart) => {
        setProductsInCart(productsInCart.filter((item) => {
            return item.id !== addedCart.id
        }))
        setOpen(false);
    };

    useEffect(() => {
        doFetch();
    }, []);

    useEffect(() => {
        if (!response) {
            return
        }

        setListAddedCart(getListAddedCartFromGetListCard(response.products, productsInCart));
    }, [response])

    useEffect(() => {
        setListAddedCart(getListAddedCartFromGetListCard(listAddedCart, productsInCart));
    }, [productsInCart]);

    if (isLoading) {
        return (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={true}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    }

    if (listAddedCart.length < 1) {
        return (
            <div className="cart__wrapper">
                <div className="empty-cart__wrapper">
                    <div className="empty-cart">
                        <h1>Your shopping cart is empty</h1>
                        <Button variant="contained" size="large" sx={{width: '100%'}} onClick={() => navigate('/')}>
                            Catalog
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="cart__wrapper">
            <Container>
                <section>
                    {listAddedCart.map((addedCart) => (
                        <article key={addedCart.id} className="product">
                            <div
                                className="product-header remove"
                                style={{background: `#fff url(${addedCart.thumbnail}) center / contain no-repeat`}}
                            >
                                <NavLink to={`/product/${addedCart.id}`}>
                                    <h3 className="product-header__title">Go to product</h3>
                                </NavLink>
                            </div>

                            <div className="product-content">
                                <div className="product-content__top">
                                    <div>
                                        <NavLink to={`/product/${addedCart.id}`}>
                                            <h1 className="product-content__title">{addedCart.title}</h1>
                                        </NavLink>
                                        <h2 className="product-content__brand">{addedCart.brand}</h2>
                                        <p>{addedCart.description}</p>
                                        <p>In stock: {addedCart.stock}</p>
                                        <div className="product-content__price">
                                            Price: <span>${addedCart.price}</span>${currentPrice(addedCart)}
                                        </div>
                                    </div>
                                    <div className="product-content__delete-wrapper">
                                        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={handleClickDelete}>
                                            Delete
                                        </Button>
                                        <Dialog
                                            open={open}
                                            onClose={handleCloseDelete}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                        >
                                            <DialogTitle id="alert-dialog-title">
                                                {"Do you really want to remove an item from the shopping cart?"}
                                            </DialogTitle>
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                    Your products will not be saved anywhere after being deleted!
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={handleCloseDelete}>NO</Button>
                                                <Button onClick={() => {handleDeleteProductsInCart(addedCart)}} autoFocus>
                                                    YES
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </div>
                                </div>

                                <div className="product-content__bottom">
                                    <div>
                                        <ButtonGroup>
                                            <Button
                                                aria-label="reduce"
                                                onClick={() => {handlerReduceCount(addedCart)}}
                                            >
                                                <RemoveIcon fontSize="small" />
                                            </Button>
                                            <Box  sx={{ p: 2, border: '1px solid #1976D2' , cursor: 'default', width: 70, textAlign: 'center'}}>
                                                {addedCart.count}
                                            </Box>
                                            <Button
                                                aria-label="increase"
                                                onClick={() => {handlerIncreaseCount(addedCart)}}
                                            >
                                                <AddIcon fontSize="small" />
                                            </Button>
                                        </ButtonGroup>
                                    </div>
                                    <div className="product-content__price-wrapper">
                                        <div className="full-price">
                                            {calcPriceOneCardAllCount(addedCart).toFixed(2)}$
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </section>
                <FormPay listAddedCart={listAddedCart}/>
            </Container>
        </div>
    );
};

export default Cart;