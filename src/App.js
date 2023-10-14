import logo from './logo.svg';
import './App.css';
import Wallet from './Pages/Wallet';
import Home from './Pages/Home';
import TeamMember from './Pages/TeamMember';
import Draweer from './Component/drawer';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
/*Import some dependencies that will be used in this file */
/*
Group 3-15
Axel Matthew Winjoto ( 103834503)
Charson Chen (103856080)
Michael Haryanto (103841613)
*/

function App() {
  return (
      <div>
        <Draweer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/TeamMember" element={<TeamMember />} />
          <Route path="/Wallet/:searchValue" element={<Wallet />} />
        </Routes>
      </div>
  );
}

export default App;
