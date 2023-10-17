import React from "react";
import { useQuery } from "@apollo/client";
import {GET_BOATS} from "../../graphql/boats/index";
import { useState } from "react";
import BoatItem from "./BoatItem";

const BoatList = () => {
    const [currentPage, setCurrentPAge] = useState(1);
    const [nameFilter, setNameFilter] = useState("");

    //get the data
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
                                <BoatItem boat={boat}/>
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