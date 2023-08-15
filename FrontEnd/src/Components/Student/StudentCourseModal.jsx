import React, { useEffect, useState } from 'react';
import Modal from '../Common/Modal';
import Button from '../Common/Button';
import { enroll } from '../../helpers/student.helpers';
import CourseDetails from '../Courses/CourseDetails';
import { getCourseSchedules } from '../../helpers/common.helpers';

const StudenCourseModal = ({
  course,
  setShow,
  setEnrolledCourses,
  isEnrolled,
}) => {
  const { enrollment_limit, enrollments_count, id } = course;
  const [disabled, setDisabled] = useState(false);

  const isMaxedOut = enrollments_count === enrollment_limit ? true : false;
  console.log(disabled || isEnrolled || isMaxedOut);
  return (
    <Modal
      setShow={setShow}
      className=" flex flex-col p-5 justify-center rounded-2xl gap-5 min-w-[400px]"
    >
      <CourseDetails course={course} className="flex flex-col gap-10" />

      <div className="button-container flex justify-end gap-3">
        <Button
          text="enroll"
          onClick={async () => {
            const { course, status } = await enroll(id);

            if (status === 'success') {
              setEnrolledCourses((prev) => [course, ...prev]);
              setDisabled(true);
            }
          }}
          className="text-[16px] text-white bg-green p-3 self-end "
          disabled={disabled || isEnrolled || isMaxedOut ? true : false}
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
