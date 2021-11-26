import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Home from './Components/Home';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
