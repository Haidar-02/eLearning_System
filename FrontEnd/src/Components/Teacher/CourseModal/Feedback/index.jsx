import React, { useState, useEffect } from 'react';
import { getCourseStudents } from '../../../../helpers/common.helpers';
import StudentCard from './StudentCard';
import StudentFeedback from './StudentFeedback';



const StudentManager = ({course_id}) => {
  const initialState={
    id:"",
    course_id,
    student_id:"",
    rating:0,
    comment:"",
  }
  const [students,setStudents]=useState([]);
  const [feedback,setFeedback]=useState({...initialState});

  const [showFeedback,setShowFeedback]=useState({id:"",show:false});

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
    Student Feedback
    </div>
    <div className='p-3  flex flex-row justify-between'>
        <div className='bg-cyan-light rounded-md studens-container'>
          <h2 className=' mb-2 border color-cyan-medium p-2 text-center font-bold'>Student List</h2>
          <ul>
            {students.map(student => (
                <StudentCard student_id={student.id} name={student.name} key={student.id} setShowFeedback={setShowFeedback}/>
            ))}
          </ul>
        </div>
        <div className="feedback-container flex-grow bg-cyan-light rounded-md ml-4 p-3">
        <h2 className=' mb-2 border color-cyan-medium p-2 text-center font-bold'>Student Feedback</h2>
          {showFeedback.show && <StudentFeedback course_id={course_id} feedback={feedback} setFeedback={setFeedback} showFeedback={showFeedback} initialState={initialState}/>}
        </div>
    </div>
    </>
  );
};

export default StudentManager;
