import React, { useEffect, useState } from "react";
import { getChildCourses, getChildTeachers } from "../../helpers/parent.helper";
import Button from "../Common/Button";

const ChildCourses = ({ child_id }) => {
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchChildCourses = async () => {
      const res = await getChildCourses(child_id);
      setCourses(res.courses);
    };

    const fetchChildTeachers = async () => {
      const res = await getChildTeachers(child_id);
      setTeachers(res.teachers);
    };

    fetchChildCourses();
    fetchChildTeachers();
  }, [child_id]);

  return (
    <div className="flex gap-5 justify-between">
      <div className="w-fit flex-col items-center justify-start ml-5 border-r-2">
        <h2 className="text-xl mb-2 font-black pr-2">Courses</h2>
        {courses.length === 0 ? (
          <p>No courses available</p>
        ) : (
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
                  {course.description}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="w-fit flex-col items-center justify-start ml-5">
        <h2 className="text-xl mb-2 font-black">Teachers</h2>
        {teachers.length === 0 ? (
          <p>No teachers available</p>
        ) : (
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
          ))
        )}
      </div>
    </div>
  );
};

export default ChildCourses;
