import React, { useState } from 'react';

const DisplayCourse = ({ course, onClick }) => {
  const {
    class_code,
    description,
    enrollment_limit,
    id,
    meet_link,
    teacher,
    title,
  } = course;
  const { id: teacher_id, name, email } = teacher;

  return (
    <div className="flex flex-col p-3 border gap-2">
      <div className="course-title ">
        <span className="gothic font-semibold text-md">{title}</span>
      </div>
      <div className="content monster text-xs flex flex-col gap-2">
        <div className="description">
          <span className="font-semibold underline">Description: </span>
          {description}
        </div>
        <div className="enrollment">
          <span className="font-semibold underline">Enrollment limit: </span>
          {enrollment_limit}
        </div>
      </div>
    </div>
  );
};

export default DisplayCourse;
