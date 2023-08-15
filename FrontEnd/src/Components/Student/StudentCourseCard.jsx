import React, { useState } from 'react';

import enrolled from '../../assets/icons/book.svg';

import Button from '../Common/Button';
import StudentCourseModal from './StudentCourseModal';
import CourseDetails from './CourseDetails';
const StudentCourseCard = ({
  course,
  setEnrolledCourses,
  enrolledIn,
  details,
}) => {
  const [show, setShow] = useState(false);
  const [showDetails, setShowDetails] = useState();

  const { description, id, teacher, title } = course;

  const isEnrolled = enrolledIn.includes(id);

  return (
    <>
      {showDetails ? (
        <CourseDetails course={course} setShowDetails={setShowDetails} />
      ) : (
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
            <span
              onClick={() => {
                details && setShowDetails((prev) => !prev);
              }}
              className="monster font-bold  text-md"
            >
              {title}
            </span>
          </div>
          <div className="content monster text-xs flex flex-col gap-2">
            <div className="description">
              <span className="font-semibold underline">Description: </span>
              {description}
            </div>
          </div>
          <div
            className={`flex ${isEnrolled ? 'justify-between' : 'justify-end'}`}
          >
            {isEnrolled && (
              <div className="flex items-center gap-3">
                <img className="w-[20px]" src={enrolled} alt="" />
                <span className="font-normal text-sm">Enrolled</span>
              </div>
            )}

            <Button
              text="content"
              onClick={() => setShow((prev) => !prev)}
              className="text-white self-end mr-2 "
            />
          </div>
        </div>
      )}
    </>
  );
};

export default StudentCourseCard;
