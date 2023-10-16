import React from "react";

import { useNavigate } from "react-router-dom";

// import StripePayment from "./../payment/stripe/StripePayment";

export default function BoatDetails(props){
    const history = useNavigate();

    const handleBuy = (id) => {
        history(`/payment/${id}`);
    };

    return (
        <>
            <img src={`https://loremflickr.com/500/300/yacht?v=${Math.random()}`} />
            <h1>{props.boat.name}</h1>
            <p>
                £{props.boat.price.toLocaleString()}
                <br/>
                {props.boat.description}
            </p>
            <button onClick={() => handleBuy(props.boat.id)}>Buy now</button>
        </>
    );
};
