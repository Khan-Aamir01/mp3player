import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import SingleMusic from "./components/SingleMusic/SingleMusic";
import AllMusic from "./components/AllMusic/AllMusic";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="" element={<Home />} />
          <Route path="/song/:id/:name" element={<SingleMusic />} />
          <Route path="/song" element={<AllMusic />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
