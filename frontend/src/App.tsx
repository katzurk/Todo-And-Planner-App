import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { MyLists } from "./pages/MyLists";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/my-lists" element={<MyLists />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
