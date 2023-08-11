import { Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/LandingPage/LandingPage';
import DashBoard from './Pages/Dashboard';
import './App.css';

function App() {
  return (
    <div className="App h-full">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashBoard" element={<DashBoard />} />
      </Routes>
    </div>
  );
}

export default App;
