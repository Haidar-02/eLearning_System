import React, { useState } from 'react';
import CourseModal from '../Courses/CourseModal';
import Button from '../Common/Button';

const CourseCard = ({ course, onClick, setCourses }) => {
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

  return (
    <div className="flex flex-col p-3 border gap-3">
      {show && (
        <CourseModal
          course={course}
          setCourses={setCourses}
          setShow={setShow}
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
        <div className="enrollment-limit">
          <span className="font-semibold underline">Enrollment Limit: </span>
          {enrollment_limit}
        </div>
        <div className="meet_link">
          <span className="font-semibold underline">Meet Link: </span>
          {meet_link}
        </div>
      </div>
      {/* <div>
      <Button
        text="Add Task"
        onClick={() => setShow((prev) => !prev)}
        className="text-white self-end mr-2 "
      />
      <Button
        text="Add Material"
        onClick={() => setShow((prev) => !prev)}
        className="text-white self-end mr-2 "
      />
      <Button
        text="Add Project"
        onClick={() => setShow((prev) => !prev)}
        className="text-white self-end mr-2 "
      />
      </div> */}

    </div>
  );
};

export default CourseCard;
