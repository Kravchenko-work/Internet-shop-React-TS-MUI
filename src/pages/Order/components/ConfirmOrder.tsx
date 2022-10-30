import React, {FC, useEffect, useState} from 'react';
import {Backdrop, CircularProgress, Container} from "@mui/material";
import useFetch from "../../../hooks/useFetch";
import {ICard, ICardInCart, IQuantityCardInCart} from "../../../types";
import {getListAddedCartFromGetListCard} from "../../../utils";
import useLocalStorage from "../../../hooks/useLocalStorage";
import FormPay from "../../../components/FormPay/FormPay";

const ConfirmOrder:FC = () => {
    const [{response, isLoading}, doFetch] = useFetch<{products: ICard[]}>();
    const [listAddedCart, setListAddedCart] = useState<ICardInCart[]>([]);
    const [quantitiesCardInCart] = useLocalStorage<IQuantityCardInCart[]>('quantitiesCardInCart', []);

    useEffect(() => {
        doFetch();
    }, []);


    useEffect(() => {
        if (!response) {
            return
        }

        setListAddedCart(getListAddedCartFromGetListCard(response.products, quantitiesCardInCart));
    }, [response])

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

    return (
        <div>
            <Container sx={{ mt: 2, mb: 1, fontWeight: 'bold', fontSize: 22 }} maxWidth="sm">
                <p>All steps completed - you are finished</p>
                <p style={{marginTop: '16px'}}>
                    Last step, confirm the ordeconfirm the order
                </p>
            </Container>
            <FormPay listAddedCart={listAddedCart} type="order"/>
        </div>
    );
};

export default ConfirmOrder;