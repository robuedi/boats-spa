import React from "react";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import StripePayment from "../payment/stripe/StripePayment";

export default function BoatDetails(props){
    const [paymentActive, setPaymentActive] = useState(false);
    const history = useNavigate();

    const handleBuy = (id) => {
        history(`/payment/${id}`);
    };

    return (
        <>
            <div className="boat-details">
                <div className="card " >
                    <img className="card-img-top" src={`https://loremflickr.com/700/400/yacht?v=${Math.random()}`} />
                    <div className="card-body">
                        <h1 className="card-title">{props.boat.name}</h1>
                        <p className="card-text">{props.boat.description}</p>
                        <p className="card-text">
                            <strong>Price:</strong> £ {props.boat.price.toLocaleString()}
                            <br/>
                            <strong>Year:</strong>  {props.boat.year}
                            <br/>
                            <strong>Length:</strong>  {props.boat.length}m
                            <br/>
                            <strong>Location:</strong>  {props.boat.location}
                        </p>
                        {!props.boat.sold &&
                            <div >
                                <br/>
                                {paymentActive ?
                                    <StripePayment productId={props.boat.id} />
                                    :
                                    <button  className="btn btn-primary" onClick={() => setPaymentActive(true)}>Buy now</button>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

