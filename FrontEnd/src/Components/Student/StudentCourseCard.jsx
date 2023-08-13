import React, { useState } from 'react';

import Button from '../Common/Button';
import StudentCourseModal from './StudentCourseModal';

const StudentCourseCard = ({ course, onClick, setCourses }) => {
  const [show, setShow] = useState(false);
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
    <div className="flex flex-col p-3 border gap-3">
      {show && <StudentCourseModal course={course} setShow={setShow} />}
      <div className="course-title ">
        <span className="gothic font-semibold text-md">{title}</span>
      </div>
      <div className="content monster text-xs flex flex-col gap-2">
        <div className="description">
          <span className="font-semibold underline">Description: </span>
          {description}
        </div>
      </div>
      <Button
        text="content"
        onClick={() => setShow((prev) => !prev)}
        className="text-white self-end mr-2 "
      />
    </div>
  );
};

export default StudentCourseCard;
