import React, { useEffect, useState } from "react";

import TeacherCourseCard from "./TeacherCourseCard";
import Button from "../Common/Button";
import { getTeacherCourses } from "../../helpers/Teacher.helpers";

const TeacherCourseManager = () => {
  const [courses, setCourses] = useState();
  const [show, setShow] = useState(false);

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
        <div className="button-container flex justify-center items-center rounded-lg p-0.5 bg-cyan-dark transition-all hover:opacity-70 active:opacity-50">
          <Button
            onClick={() => setShow(true)}
            text="Create New Course"
            className="p-0 bg-transparent text-xl text-white"
          />
        </div>
      </div>
      {courses &&
        courses.map((course, index) => (
          <TeacherCourseCard key={index} course={course} />
        ))}{" "}
    </div>
  );
};

export default TeacherCourseManager;
