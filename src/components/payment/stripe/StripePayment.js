import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeCheckoutForm from "./StripeCheckoutForm";
import axios from 'axios';

function StripePayment(props) {
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState("");
    const [intentId, setIntentId] = useState("");
    const [email, setEmail] = useState('');

    useEffect(() => {
        setStripePromise(loadStripe('pk_test_51O1mfsDgSOPks96HwmonZqXjRHysIFkCjcwQcvw1CjxmhHWaGaVdrnndYQghHnpR3fmavQenWXaH0lF3Q98lEsQW00a8dabJYz'))
    }, []);

    const getIntent = () => {
        axios.post("http://localhost:80/api/v1/payment/initiate", {
            product_id: props.productId,
            email: email,
        })
        .then((result) => {
            setClientSecret(result.data.client_secret);
            setIntentId(result.data.intent_id)
        });
    }


    return (
        <>
            <h4>Payment</h4>
            <br/>
            {!(email && clientSecret && stripePromise) ? (
                <div>
                    <div className="col-auto">
                        <input className="form-control" value={email} onChange={e => setEmail(e.target.value)} placeholder="Please enter your email to proceed with payment" />
                    </div>
                    <br/>
                    <button className="btn btn-primary" onClick={e => getIntent()}>Continue</button>
                </div>
            )
                :
                (
                    <Elements
                        stripe={stripePromise}
                        options={{ clientSecret, locale: "uk" }}
                    >
                        <StripeCheckoutForm intentId={intentId} />
                    </Elements>
                )
            }
        </>
    );
}

export default StripePayment;