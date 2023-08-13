import React, { useEffect, useState } from "react";

import CourseCard from "./TeacherCourseCard";
import Button from "../Common/Button";
import { getTeacherCourses } from "../../helpers/Teacher.helpers";
const TeacherCourseManager = () => {
  const [courses, setCourses] = useState();

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await getTeacherCourses();
      setCourses(res);
    };

    fetchCourses();
  }, []);

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <div className="page-header gothic color-cyan-dark text-2xl py-5">
          My Courses
        </div>
        <div className="button-container flex justify-center items-center rounded-full p-3 w-[20px] h-[20px] bg-cyan-dark">
          {/* <Button
            onClick={() => setShow(true)}
            text="+"
            className="p-0 bg-transparent text-xl text-white"
          /> */}
        </div>
      </div>
      {/* {show && <CourseAdd setShow={setShow} setCourses={setCourses} />} */}

      {courses &&
        courses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
    </div>
  );
};

export default TeacherCourseManager;
