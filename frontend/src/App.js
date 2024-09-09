import './App.css';
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Registration from "./components/Registration/Registration";
import Header from './components/Header/Header';
import Crms from "./components/Crms/Crms";
import Crm from "./components/Crm/Crm";

function App() {
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate("/login"); // Redirect to login if no token is found
    }
  }, [navigate]);

  return (
    <>
      <Header />
      <div>
        <Routes>
          <Route exact path="/" element={<Crms />} />
          <Route exact path="/login" element={<Registration />} />
          <Route exact path="/crm/:id" element={<Crm />} />
        </Routes>
      </div>
    </>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;