import { Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/LandingPage/LandingPage';

import './App.css';
import AdminDashBoard from './Pages/Admin/AdminDashBoard';
import StudentDashBoard from './Pages/Student/StudentDashBoard';
import ParentDashBoard from './Pages/Parent/ParentDashBoard';
import TeacherDashBoard from './Pages/Teacher/TeacherDashBoard';

function App() {


  return (
    <div className="App h-full">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/adminDash" element={<AdminDashBoard />} />
        <Route path="/studentDash" element={<StudentDashBoard/>} />
        <Route path="/parentDash" element={<ParentDashBoard />} />
        <Route path="/teacherDash" element={<TeacherDashBoard />} />

      </Routes>
  );
}

export default App;
