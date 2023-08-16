import { useState } from "react";


const StudentCard = ({student_id, name,setShowStudentAttendance}) => {
    return ( 
        <>
            <li className="text-black m-5 cursor-pointer hover:underline" onClick={()=>{
            setShowStudentAttendance({show:true,id:student_id})
            }}>
                {name}
            </li>
        </>

     );
}
 
export default StudentCard;