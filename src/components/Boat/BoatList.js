import React from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import {GET_BOATS} from "../../graphql/boats/index";

const BoatList = () => {
    const { loading, error, data } = useQuery(GET_BOATS);
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;
    return (
        <>
            <table  className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Price</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.boats.data.map((boat) => (
                        <tr key={boat.id}>
                            <td className="bg-image" style={{backgroundImage: "url(https://loremflickr.com/500/300/yacht?v="+Math.random()+")", minWidth: '200px'}}></td>
                            <td  >
                                <h4>{boat.name}</h4>
                                <p>{boat.description}</p>
                                <br/>
                                <span>£{boat.price.toLocaleString()}</span>
                            </td>
                            <td >
                                <Link to={`boats/${boat.id}`} className="btn btn-primary">
                                    Show Details
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};
export default BoatList;