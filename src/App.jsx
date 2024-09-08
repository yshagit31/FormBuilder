import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Dashboard from './Pages/Dashboard'; 
import Create from './Pages/CreateForm'; 

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/dashboard" element={<Dashboard />} /> 
            <Route path="/createForm/:id" element={<Create />} /> 
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
