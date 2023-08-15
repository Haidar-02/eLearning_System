import React, { useState, useEffect } from 'react';
import { getCourseStudents } from '../../../../helpers/common.helpers';

const StudentList = ({course_id,students,setStudents}) => {

  useEffect(()=>{
    const fetchStudents = async () => {
      const res = await getCourseStudents(course_id);
      setStudents(res);
    };
    fetchStudents()
  },[])

  return (
    <div className='border bg-cyan-light p-3 rounded-md'>
      <h2 className=' mb-2 border-white border color-cyan-medium p-2 text-center'>Student List</h2>
      <ul>
        {students.map(student => (
          <li className="text-white" key={student.id} onClick={() => handleSelectStudent(student)}>
            {student.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
