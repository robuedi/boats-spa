import React from "react";

import BoatList from "../../components/boat/BoatList";

const Boats = () => {
    return (
        <>
            <div className="list-container">
                <h1>Boats</h1>
                <BoatList/>
            </div>
        </>
    );
}
export default Boats;