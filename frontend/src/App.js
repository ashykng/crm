import './App.css';
import Registration from "./components/Registration/Registration";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from './components/Header/Header';
import Crms from "./components/Crms/Crms"
import Crm from "./components/Crm/Crm"

function App() {
  return (
    <Router>
      <Header />
      <div>
        <Routes>
          <Route exact path="/" element={<Crms />} />
          <Route exact path="/login" element={<Registration />} />
          <Route exact path="/crm/:id" element={<Crm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
