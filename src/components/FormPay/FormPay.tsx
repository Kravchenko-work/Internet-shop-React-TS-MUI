import React, {FC} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {calcPriceAllCardAllCount} from "../../utils";
import {ICardInCart, IQuantityCardInCart} from "../../types";
import {useNavigate} from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";

interface IFormPay {
    listAddedCart:ICardInCart[]
    type?:string
}

const FormPay:FC<IFormPay> = ({listAddedCart, type="cart"}) => {
    const [open, setOpen] = React.useState(false);

    const [_, setQuantitiesCardInCart] = useLocalStorage<IQuantityCardInCart[]>('quantitiesCardInCart', []);

    const navigate = useNavigate();
    const subtotal = calcPriceAllCardAllCount(listAddedCart),
        taxes = (calcPriceAllCardAllCount(listAddedCart) * 0.05).toFixed(2),
        total = (subtotal + Number(taxes) + 5).toFixed(2);

    const handlerRedirectBuy = () => {
        if (type === "cart" ) {
            navigate('/order');
        } else {
            handleClickOpen();
            setQuantitiesCardInCart([]);
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        navigate('/');
    };

    return (
        <>
            <div className="product-footer">
                <div className="product-footer__left">
                    <h2>Subtotal: {subtotal.toFixed(2)}$</h2>
                    <h3>Taxes (5%): {taxes}$</h3>
                    <h3>Shipping: 5.00$</h3>
                </div>

                <div className="product-footer__right">
                    <h1>Total: {total}$</h1>
                    <Button
                        variant="contained"
                        size="large"
                        sx={{width: '100%'}}
                        onClick={handlerRedirectBuy}
                    >
                        Buy
                    </Button>
                </div>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Thank you for the order. We will send you the date of arrival of the goods by mail
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Go to shop
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default FormPay;