import React, { useContext } from "react";
import styles from "./CashPayment.module.css";
import { CartContext } from "../../context/cartContext";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import AddressForm from "../AddressForm/AddressForm";

export default function CashPayment() {
    const { cashOrder } = useContext(CartContext);

    const navigate = useNavigate();

    async function cashPayment(id, values) {
        await cashOrder(id, values);
        navigate("/allorders");
    }
    return (
        <>
            <Helmet>
                <title>Cash Address Form</title>
                <meta name="description" content="Cash Address Form Page" />
            </Helmet>
            <AddressForm submitFn={cashPayment} btnTxt="Pay By Cash" />
        </>
    );
}
