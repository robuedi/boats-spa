import React, {useEffect} from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import {GET_BOATS} from "../../graphql/boats/index";
import { useState } from "react";
import {loadStripe} from "@stripe/stripe-js";

const BoatList = () => {
    const [currentPage, setCurrentPAge] = useState(1);
    const [nameFilter, setNameFilter] = useState("");

    const {loading, error, data} = useQuery(GET_BOATS, {
        variables: {
            page: currentPage,
            name: `%${nameFilter}%`
        },
    });

    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;
    return (
        <>
            <input value={nameFilter} onChange={e => setNameFilter(e.target.value)} placeholder="Filter by name"/>
            <table  className="table table-striped table-hover">
                <tbody>
                    {data.boats.data.map((boat) => (
                        <tr key={boat.id}>
                            <td >
                                <div className="boat-item-container">
                                    <div className="bg-image" style={{backgroundImage: "url(https://loremflickr.com/500/300/yacht,boat?v="+Math.random()+")"}}></div>
                                    <div>
                                        <h4>{boat.name}</h4>
                                        <p><strong>Available</strong>: {boat.sold ?
                                            <span className="badge bg-warning text-dark">No</span>
                                            :
                                            <span className="badge bg-light text-dark">Yes</span>
                                        }</p>
                                        <p>{boat.description}</p>
                                        <br/>
                                        <div className="show-details-container">
                                            <span>£ {boat.price.toLocaleString()}</span>
                                            <Link to={`boats/${boat.id}`} className="btn btn-primary">
                                                Show Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination-container">
                <div className="btns">
                    {data.boats.paginatorInfo.currentPage > 1 &&
                    <button className="btn btn-primary" type="button" onClick={e => setCurrentPAge(currentPage -1)}>Prev</button>
                    }
                    {data.boats.paginatorInfo.hasMorePages &&
                    <button className="btn btn-primary"  type="button" onClick={e => setCurrentPAge(currentPage +1)}>Next</button>
                    }
                </div>
                <span>Page: {data.boats.paginatorInfo.currentPage}</span>
            </div>
        </>
    );
};
export default BoatList;