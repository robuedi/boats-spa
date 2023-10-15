import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/">Home</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
export default Navbar;