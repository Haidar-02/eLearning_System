import { useState ,useEffect} from "react";
import Button from "../../../../../../Common/Button";
import StudentAttendance from "./StudentAttendance";
import StudentCard from "./StudentCard";
import { getCourseStudents } from "../../../../../../../helpers/common.helpers";

const Attendance = ({course_id,session_id,setShowAttendance}) => {
    const initialState={
        id:"",
        session_id,
        student_id:"",
        attendance_status:"",
        attendance_date:"",
      }
      const [students,setStudents]=useState([]);
      const [attendance,setAttendance]=useState({...initialState});
    
      const [showStudentAttendance,setShowStudentAttendance]=useState({id:"",show:false});
    
      useEffect(()=>{
        const fetchStudents = async () => {
          const res = await getCourseStudents(course_id);
          setStudents(res);
        };
        fetchStudents()
      },[])
    
    return ( 
        <>
    <div className="flex items-center justify-between">
        <div className="page-header gothic color-cyan-dark text-2xl py-5">
            Student Attendance
        </div>
        <div className="button-container flex items-center rounded-full p-3 h-[20px] ">
            <Button
            onClick={() => setShowAttendance({id:null,show:false})}
            text="Back"
            className="p-0 bg-cyan text-xl text-white"
            />

        </div>
    </div>
    <div className='p-3  flex flex-row justify-between'>
        <div className='bg-cyan-light rounded-md studens-container'>
          <h2 className=' mb-2 border color-cyan-medium p-2 text-center font-bold'>Student List</h2>
          <ul>
            {students.map(student => (
                <StudentCard student_id={student.id} name={student.name} key={student.id} setShowStudentAttendance={setShowStudentAttendance}/>
            ))}
          </ul>
        </div>
        <div className="feedback-container flex-grow bg-cyan-light rounded-md ml-4 p-3">
        <h2 className=' mb-2 border color-cyan-medium p-2 text-center font-bold'>Attendance</h2>
          {showStudentAttendance.show && <StudentAttendance session_id={session_id} attendance={attendance} setAttendance={setAttendance} showStudentAttendance={showStudentAttendance} initialState={initialState}/>}
        </div>
    </div>
    </>
     );
}
 
export default Attendance;