import React, { useEffect, useState } from 'react';
import Modal from '../Common/Modal';
import Button from '../Common/Button';

import CourseDetails from '../Courses/CourseDetails';

const StudenCourseModal = ({ course, setShow, setCourses }) => {
  console.log(course);
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

  const isMaxedOut = enrollments_count === enrollment_limit ? true : false;
  return (
    <Modal
      setShow={setShow}
      className=" flex flex-col p-5 justify-center rounded-2xl gap-5 min-w-[400px]"
    >
      <CourseDetails course={course} className="flex flex-col gap-10" />

      <div className="button-container flex justify-end gap-3">
        <Button
          text="enroll"
          onClick={() => {}}
          className="text-[16px] text-white bg-green p-3 self-end "
          disabled={isMaxedOut ? true : false}
        />
        <Button
          text="cancel"
          onClick={() => {
            setShow(false);
          }}
          className="text-[16px] bg-transparent text-cyan-600  p-3 self-end "
        />
      </div>
    </Modal>
  );
};

export default StudenCourseModal;
