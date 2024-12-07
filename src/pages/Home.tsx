import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h1>Welcome to the Canvas App</h1>
            <p>Click the link below to manage your canvas:</p>
            <Link to="/managecanvas" style={{ fontSize: "20px", color: "blue" }}>
                Go to Manage Canvas
            </Link>
        </div>
    );
};

export default Home;
