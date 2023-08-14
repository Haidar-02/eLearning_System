import React, { useState } from 'react';

const GroupSelection = ({ selectedStudents }) => {
  return (
    <div>
      <h2>Selected Students</h2>
      <ul>
        {selectedStudents.map(student => (
          <li key={student.id}>{student.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default GroupSelection;
