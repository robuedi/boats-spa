import {Link} from "react-router-dom";
import React from "react";

export default function BoatDetails(props){
    return (
        <div className="boat-item-container">
            <div className="bg-image" style={{backgroundImage: "url(https://loremflickr.com/500/300/yacht,boat?v="+Math.random()+")"}}></div>
            <div>
                <h4>{props.boat.name}</h4>
                <p><strong>Available</strong>: {props.boat.sold ?
                    <span className="badge bg-warning text-dark">No</span>
                    :
                    <span className="badge bg-light text-dark">Yes</span>
                }</p>
                <p>{props.boat.description}</p>
                <br/>
                <div className="show-details-container">
                    <span>£ {props.boat.price.toLocaleString()}</span>
                    <Link to={`boats/${props.boat.id}`} className="btn btn-primary">
                        Show Details
                    </Link>
                </div>
            </div>
        </div>
    )
}