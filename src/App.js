import logo from './logo.svg';
import './App.css';
import Wallet from './Pages/Wallet';
import Home from './Pages/Home';
import TeamMember from './Pages/TeamMember';
import Draweer from './Component/drawer';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';



function App() {
  return (
      <div>
        <Draweer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/TeamMember" element={<TeamMember />} />
          <Route path="/Wallet" element={<Wallet />} />
        </Routes>
      </div>
  );
}

export default App;
