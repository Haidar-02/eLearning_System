import { useState } from "react";


const StudentCard = ({student_id, name,setShowFeedback}) => {
    return ( 
        <>
            <li className="text-black m-5 cursor-pointer hover:underline" onClick={()=>{
            setShowFeedback({show:true,id:student_id})
            }}>
                {name}
            </li>
        </>

     );
}
 
export default StudentCard;