import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "./pages/Home";
import { MyLists } from "./pages/MyLists/MyLists";
import { Navbar } from "./components/Navbar";
import { EditList } from "./pages/EditList/EditList";

function App() {
  const client = new QueryClient();
  return (
    <div className="App">
      <QueryClientProvider client={client}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/my-lists" element={<MyLists />} />
            <Route path="/edit-list/:list_id" element={<EditList />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
