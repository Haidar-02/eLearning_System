import React, { useEffect, useState } from "react";
import { getChildCourses, getChildTeachers } from "../../helpers/parent.helper";
import Button from "../Common/Button";

const ChildCourses = () => {
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const child_id = 4;
  useEffect(() => {
    const fetchChildCourses = async () => {
      const res = await getChildCourses(child_id);
      setCourses(res.courses);
    };

    fetchChildCourses();
  }, []);

  useEffect(() => {
    const fetchChildTeachers = async () => {
      const res = await getChildTeachers(child_id);
      setTeachers(res.teachers);
    };

    fetchChildTeachers();
  }, []);

  return (
    <div className="flex gap-5 justify-between">
      <div className=" w-fit flex-col items-center justify-start ml-5 border-r-2">
        <h2 className="text-xl mb-2 font-black">Courses</h2>
        {courses &&
          courses.map((course) => (
            <div
              key={course.id}
              className="flex flex-col p-3 border gap-3 w-11/12 m-2 cursor-default hover:bg-cyan-700 hover:text-white transition-all rounded-lg bg-gray-100"
            >
              <div className="course-title ">
                <span className="monster font-bold  text-md">
                  {course.title}
                </span>
              </div>
              <div className="content monster text-xs flex flex-col gap-2">
                <div className="description">
                  <span className="font-semibold">Description </span>
                  {course.descripton}
                </div>
              </div>
            </div>
          ))}
        {""}
      </div>
      <div className=" w-fit flex-col items-center justify-start ml-5">
        <h2 className="text-xl mb-2 font-black">Teachers</h2>
        {teachers &&
          teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="flex flex-col p-3 border gap-3 w-full m-2 cursor-default hover:bg-cyan-700 text-white transition-all rounded-lg bg-gray-600"
            >
              <div className="course-title ">
                <span className="monster font-bold  text-md">
                  {teacher.name}
                </span>
              </div>
              <div className="content monster text-xs flex flex-col gap-2">
                <div className="description">
                  <span className="font-semibold">Email </span>
                  {teacher.email}
                </div>
              </div>
            </div>
          ))}
        {""}
      </div>
    </div>
  );
};

export default ChildCourses;
