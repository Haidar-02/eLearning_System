import React, { useState, useEffect } from 'react';
import { getCourseStudents } from '../../../../helpers/common.helpers';

const StudentList = ({ onSelectStudent,course_id}) => {
  const [students, setStudents] = useState([]);

  useEffect(()=>{
    const fetchStudents = async () => {
      const res = await getCourseStudents(course_id);
      setStudents(res);
    };
    console.log(students)
    fetchStudents()
  },[])

  return (
    <div>
      <h2>Student List</h2>
      <ul>
        {students.map(student => (
          <li key={student.id} onClick={() => onSelectStudent(student)}>
            {student.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
