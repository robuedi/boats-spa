import React from "react";

export default function BoatDetails(props){
    return (
        <>
            <img src={`https://loremflickr.com/500/300/yacht?v=${Math.random()}`} />
            <h1>{props.boat.name}</h1>
            <p>
                £{props.boat.price.toLocaleString()}
                <br/>
                {props.boat.description}
            </p>
        </>
    );
};
