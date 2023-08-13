import React, { useEffect, useState } from 'react';

import CourseCard from '../../Components/Courses/CourseCard';
import Button from '../../Components/Common/Button';
import { getAllCourses } from '../../helpers/common.helpers';
import CourseAdd from '../../Components/Courses/CourseAdd';

const StudentCourseManager = () => {
  const [courses, setCourses] = useState();
  //   const [show, setShow] = useState(false);

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
      <div className="page-header gothic color-cyan-dark text-2xl py-5">
        Manage Courses
      </div>

      {courses &&
        courses.map((course, index) => (
          <CourseCard key={index} course={course} setCourses={setCourses} />
        ))}
    </div>
  );
};

export default StudentCourseManager;
