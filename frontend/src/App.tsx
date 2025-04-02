import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "./pages/Home";
import { MyLists } from "./pages/MyLists/MyLists";

function App() {
  const client = new QueryClient();
  return (
    <div className="App">
      <QueryClientProvider client={client}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/my-lists" element={<MyLists />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
