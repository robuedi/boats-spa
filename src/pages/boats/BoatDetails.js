import React from "react";
import {useParams} from 'react-router-dom';
import { useQuery } from "@apollo/client";
import {GET_BOAT} from "../../graphql/boats";
import BoatDetails from "../../components/boat/BoatDetails";

const BoatList = () => {
    const {id} = useParams();
    const { loading, error, data } = useQuery(GET_BOAT, {
        variables: { id: id },
    });
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;
    return (
        <>
            <BoatDetails boat={data.boat}/>
        </>
    );
};
export default BoatList;