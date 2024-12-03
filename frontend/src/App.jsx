import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AddData from "./components/AddData";
import UpdateData from "./components/UpdateData";
import DeleteData from "./components/DeleteData";
import DisplayData from "./components/DisplayData";
import Summary from "./components/Summary";

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | <Link to="/add">Add Data</Link> |{" "}
        <Link to="/update">Update Data</Link> |
        <Link to="/delete">Delete Data</Link> |{" "}
        <Link to="/display">Display Records</Link> |
        <Link to="/summary">Summary</Link>
      </nav>
      <Routes>
        <Route path="/add" element={<AddData />} />
        <Route path="/update" element={<UpdateData />} />
        <Route path="/delete" element={<DeleteData />} />
        <Route path="/display" element={<DisplayData />} />
        <Route path="/summary" element={<Summary />} />
      </Routes>
    </Router>
  );
};

export default App;
