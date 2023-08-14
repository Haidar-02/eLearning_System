import React, { useState } from "react";
import Button from "../Common/Button";
import CourseModal from "../Common/CourseModal";

const CourseCard = ({ course }) => {
  const [courseModel, setCourseModel] = useState(false);

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
    <div className="flex flex-col p-3 border gap-3 rounded-md transition-colors hover:bg-slate-200">
      {courseModel && (
        <CourseModal
          courseModel={courseModel}
          setCourseModel={setCourseModel}
          course={course}
        />
      )}

      <div
        className="course-title  cursor-pointer "
        onClick={() => setCourseModel(true)}
      >
        <span className="text-md font-bold uppercase hover:underline">
          {title}
        </span>
      </div>
      <div className="content monster text-xs flex flex-col gap-5 cursor-default">
        <div className="description">
          <span className="font-semibold">Description: </span>
          {description}
        </div>
        <div className="enrollment-limit">
          <span className="font-semibold">Enrollment Limit: </span>
          {enrollment_limit}
        </div>
        <div className="meet_link">
          <span className="font-semibold">Meet Link: </span>
          {meet_link}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
