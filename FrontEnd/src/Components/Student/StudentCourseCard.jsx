import React, { useState } from 'react';

import enrolled from '../../assets/icons/book.svg';

import Button from '../Common/Button';
import StudentCourseModal from './StudentCourseModal';

const StudentCourseCard = ({ course, setEnrolledCourses, enrolledIn }) => {
  const [show, setShow] = useState(false);

  const { description, id, teacher, title } = course;

  const isEnrolled = enrolledIn.includes(id);

  return (
    <div className="flex flex-col p-3 border gap-3">
      {show && (
        <StudentCourseModal
          isEnrolled={isEnrolled}
          course={course}
          setShow={setShow}
          setEnrolledCourses={setEnrolledCourses}
        />
      )}
      <div className="course-title ">
        <span className="gothic font-semibold text-md">{title}</span>
      </div>
      <div className="content monster text-xs flex flex-col gap-2">
        <div className="description">
          <span className="font-semibold underline">Description: </span>
          {description}
        </div>
      </div>
      <div className={`flex ${isEnrolled ? 'justify-between' : 'justify-end'}`}>
        {isEnrolled && <img className="w-[20px]" src={enrolled} alt="" />}
        <Button
          text="content"
          onClick={() => setShow((prev) => !prev)}
          className="text-white self-end mr-2 "
        />
      </div>
    </div>
  );
};

export default StudentCourseCard;
