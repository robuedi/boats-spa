import React from "react";

import BoatList from "../../components/Boat/BoatList";

const Home = () => {
    return (
        <div>
            <div className="middle">
                <h1>Boats</h1>
                <BoatList/>
            </div>
        </div>
    );
}
export default Home;