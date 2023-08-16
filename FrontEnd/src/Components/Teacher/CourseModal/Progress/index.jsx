import StudentCard from "./StudentCard";
import StudentProgress from "./StudentProgress";
import React, { useState, useEffect } from 'react';
import { getCourseStudents } from '../../../../helpers/common.helpers';

const ProgressManager = ({course_id}) => {
    const [students,setStudents]=useState([]);

    const [showProgress,setShowProgress]=useState({id:null,show:false});
    useEffect(()=>{
        const fetchStudents = async () => {
          const res = await getCourseStudents(course_id);
          setStudents(res);
        };
        fetchStudents()
      },[])

    return ( 
        <>
        <div className="page-header gothic color-cyan-dark text-2xl py-5">
        Student Progress
        </div>
        <div className='p-3  flex flex-row justify-between'>
            <div className='bg-cyan-light rounded-md studens-container'>
              <h2 className=' mb-2 border color-cyan-medium p-2 text-center font-bold'>Student List</h2>
              <ul>
                {students.map(student => (
                    <StudentCard student_id={student.id} name={student.name} key={student.id} setShowProgress={setShowProgress}/>
                ))}
              </ul>
            </div>
            <div className="feedback-container flex-grow bg-cyan-light rounded-md ml-4 p-3">
            <h2 className=' mb-2 border color-cyan-medium p-2 text-center font-bold'>Progress</h2>
              {showProgress.show && <StudentProgress course_id={course_id} showProgress={showProgress}/>}
            </div>
        </div>
        </>
     );
}
 
export default ProgressManager;