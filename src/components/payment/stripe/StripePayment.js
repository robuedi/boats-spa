import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeCheckoutForm from "./StripeCheckoutForm";
import axios from 'axios';

function StripePayment(props) {
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");
    const [intentId, setIntentId] = useState("");

    useEffect(() => {
        setStripePromise(loadStripe('pk_test_51O1mfsDgSOPks96HwmonZqXjRHysIFkCjcwQcvw1CjxmhHWaGaVdrnndYQghHnpR3fmavQenWXaH0lF3Q98lEsQW00a8dabJYz'))


        axios.post("http://localhost:80/api/v1/payment/initiate", {
            product_id: props.productId
        })
        .then((result) => {
            setClientSecret(result.data.client_secret);
            setIntentId(result.data.intent_id)
            console.log(clientSecret)
        });
    }, [props.productId]);


    return (
        <div style={{}}>
            <h1>React Stripe and the Payment Element</h1>
            <p>{clientSecret ? '1' : '0'}</p>
            <p>{stripePromise ? '1A' : '0B'}</p>
            {clientSecret && stripePromise && (
                <Elements
                    stripe={stripePromise}
                    options={{ clientSecret, locale: "uk" }}
                >
                    <StripeCheckoutForm intentId={intentId} />
                </Elements>
            )}
        </div>
    );
}

export default StripePayment;