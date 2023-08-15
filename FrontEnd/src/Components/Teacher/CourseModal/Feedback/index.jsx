import { useState } from "react";
import StudentList from "./StudentList";

const Feedback = ({course_id}) => {
    const [students,setStudents]=useState([]);
    return ( <StudentList course_id={course_id} students={students} setStudents={setStudents}/> );
}
 
export default Feedback;