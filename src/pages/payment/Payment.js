import React from "react";
import { useParams } from "react-router-dom";
import StripePayment from "./../../components/payment/stripe/StripePayment";

function Payment() {
    const { id } = useParams();

    return (
        <StripePayment productId={id} />
    );
}

export default Payment;