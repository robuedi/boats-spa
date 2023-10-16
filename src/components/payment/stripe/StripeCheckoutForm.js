import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

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
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsProcessing(true);

        const {error} = await stripe.confirmPayment({
            elements,
            redirect: 'if_required'
            // confirmParams: {
            //     return_url: `${window.location.origin}/completion`,
            // },
        })

        //we have an issue
        if(error){
            await axios.post("http://localhost:80/api/v1/payment/fail", {
                intent_id: props.intentId
            })
            navigate('/payment/failed')
        }
        else{
            //successful
            await axios.post("http://localhost:80/api/v1/payment/complete", {
                intent_id: props.intentId
            })
            navigate('/payment/completed')
        }

        setIsProcessing(false);


    };

    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" />
            <button disabled={isProcessing || !stripe || !elements} id="submit">
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
            </button>
            {message && <div id="payment-message">{message}</div>}
        </form>
    );
}