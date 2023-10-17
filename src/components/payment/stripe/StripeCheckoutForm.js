import { PaymentElement } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Payment from "./../../../services/Payment"

export default function CheckoutForm(props) {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const [message, setMessage] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            return;
        }

        setIsProcessing(true);

        const {error} = await stripe.confirmPayment({
            elements,
            redirect: 'if_required'
        })

        //we have an issue
        if(error){
            await Payment.failPayment(props.intentId)
            navigate('/payment/failed')
        }
        else{
            //successful
            await Payment.completePayment(props.intentId)
            navigate('/payment/completed')
        }

        setIsProcessing(false);
    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" />
            <button disabled={isProcessing || !stripe || !elements} id="submit" className="btn btn-primary">
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
            </button>
            {message && <div id="payment-message">{message}</div>}
        </form>
    );
}