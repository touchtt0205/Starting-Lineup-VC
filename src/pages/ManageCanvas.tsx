import React from "react";
import CanvasComponent from "../components/CanvasComponent";

const ManageCanvas: React.FC = () => {
    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h1>Manage Canvas</h1>
            <CanvasComponent width={1440} height={1080} />
        </div>
    );
};

export default ManageCanvas;
