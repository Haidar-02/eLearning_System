import React, { useEffect, useState } from 'react';

import CourseCard from '../../Components/Courses/CourseCard';
import Button from '../../Components/Common/Button';
import { getAllCourses } from '../../helpers/common.helpers';
import CourseAdd from '../../Components/Courses/CourseAdd';

const AdminCourseManager = () => {
  const [courses, setCourses] = useState();
  const [show, setShow] = useState(false);
  console.log(courses);
  useEffect(() => {
    const fetchCourses = async () => {
      const res = await getAllCourses();
      setCourses(res);
    };

    fetchCourses();
  }, []);

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <div className="page-header gothic color-cyan-dark text-2xl py-5">
          Manage Courses
        </div>
        <div className="button-container flex justify-center items-center rounded-full p-3 w-[20px] h-[20px] bg-cyan-dark">
          <Button
            onClick={() => setShow(true)}
            text="+"
            className="p-0 bg-transparent text-xl text-white"
          />
        </div>
      </div>
      {show && <CourseAdd setShow={setShow} setCourses={setCourses} />}

      {courses &&
        courses.map((course, index) => (
          <CourseCard key={index} course={course} setCourses={setCourses} />
        ))}
    </div>
  );
};

export default AdminCourseManager;
