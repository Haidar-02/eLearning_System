import React, { useEffect, useState } from 'react';
import Modal from '../Common/Modal';
import Button from '../Common/Button';
const CourseDetails = ({ course, className }) => {
  const {
    class_code,
    description,
    enrollment_limit,
    id,
    meet_link,
    teacher,
    title,
    enrollments_count,
  } = course;
  const { id: teacher_id, name, email } = teacher;

  return (
    <>
      <div className={`course-title `}>
        <span className="gothic font-semibold text-md">{title}</span>
      </div>
      <div className="content monster text-sm flex flex-col gap-5">
        <div className="description">
          <span className="font-semibold underline">Description: </span>
          {description}
        </div>
        <div className="teacher">
          <span className="font-semibold underline">Teacher: </span>
          <span className="teacher-name">{name}</span>
        </div>
        <div className="meet">
          <span className="font-semibold underline">Meet Link: </span>
          {meet_link}
        </div>
        <div className="enrollment">
          <span className="font-semibold underline">Enrollments: </span>
          {`${enrollments_count}/${enrollment_limit}`}
        </div>
      </div>
    </>
  );
};

export default CourseDetails;
