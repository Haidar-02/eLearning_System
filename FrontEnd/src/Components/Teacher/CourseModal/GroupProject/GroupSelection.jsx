import React, { useState } from 'react';

const GroupSelection = ({ selectedStudents,handleSelectStudent }) => {
  return (
    <div className='border p-3 bg-cyan-light rounded-md ml-4'>
      <h2 className=' mb-2 border-white border color-cyan-medium  p-2'>Selected Students</h2>
      <ul>
        {selectedStudents.map(student => (
          <li className="text-black" key={student.id} onClick={() => handleSelectStudent(student)}>{student.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default GroupSelection;
