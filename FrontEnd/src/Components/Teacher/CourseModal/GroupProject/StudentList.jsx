import React, { useState, useEffect } from 'react';
import { getCourseStudents } from '../../../../helpers/common.helpers';

const StudentList = ({ handleSelectStudent,course_id,students,setStudents}) => {

  useEffect(()=>{
    const fetchStudents = async () => {
      const res = await getCourseStudents(course_id);
      setStudents(res);
    };
    fetchStudents()
  },[])

  return (
    <div className='border'>
      <h2 className=' mb-2'>Student List</h2>
      <ul>
        {students.map(student => (
          <li key={student.id} onClick={() => handleSelectStudent(student)}>
            {student.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
