import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import VolleyballLineupApp from "./components/VolleyballLineupApp";
import Canvas from "./components/Canvas";
// import lineup3 from "./components/lineup";
// import Home from "./pages/Home";
// import ManageCanvas from "./pages/ManageCanvas";


const App: React.FC = () => {

  return (
    <Router basename="/Starting-Lineup-VC"> 
      <div>
        <Routes>
          <Route path="/" element={<Canvas />} />

          </Routes>
      </div>
    </Router>
  );
};

export default App;
