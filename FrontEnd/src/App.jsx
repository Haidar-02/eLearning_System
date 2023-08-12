import { Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/LandingPage/LandingPage';

import './App.css';
import AdminDashBoard from './Pages/Admin/AdminDashBoard';

function App() {
  return (
    <div className="App h-full">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/adminDash" element={<AdminDashBoard />} />
      </Routes>
    </div>
  );
}

export default App;
