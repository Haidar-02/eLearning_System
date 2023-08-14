import React, { useState } from 'react';

const GroupSelection = ({ selectedStudents,handleSelectStudent }) => {
  return (
    <div className='border'>
      <h2 className=' mb-2'>Selected Students</h2>
      <ul>
        {selectedStudents.map(student => (
          <li key={student.id} onClick={() => handleSelectStudent(student)}>{student.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default GroupSelection;
