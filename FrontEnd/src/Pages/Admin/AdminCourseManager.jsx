import React, { useEffect, useState } from 'react';

import CourseCard from '../../Components/Courses/CourseCard';
import { getAllCourses } from '../../helpers/admin.helpers';

const AdminCourseManager = () => {
  const [courses, SetCourses] = useState();

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await getAllCourses();
      SetCourses(res);
    };

    fetchCourses();
  }, []);

  return (
    <div className="">
      <div className="page-header gothic color-cyan-dark text-2xl py-5 mb-5">
        Manage Courses
      </div>
      {courses &&
        courses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
    </div>
  );
};

export default AdminCourseManager;
