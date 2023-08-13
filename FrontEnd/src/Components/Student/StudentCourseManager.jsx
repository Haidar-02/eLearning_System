import React, { useEffect, useState } from 'react';

import Button from '../../Components/Common/Button';
import { getAllCourses } from '../../helpers/common.helpers';

import CourseAdd from '../../Components/Courses/CourseAdd';
import StudentCourseCard from './StudentCourseCard';
import { getEnrolledCourses } from '../../helpers/student.helpers';

const StudentCourseManager = () => {
  const [courses, setCourses] = useState();
  const [enrolledCourses, setEnrolledCourses] = useState();
  const [user, setUser] = useState();
  //   const [show, setShow] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    const fetchCourses = async () => {
      const res = await getAllCourses();
      setCourses(res);
    };
    const fetchEnrolled = async () => {
      const res = await getEnrolledCourses();
      setEnrolledCourses(res);
    };
    setUser(user);
    fetchCourses();
    fetchEnrolled();
  }, []);

  const enrolledIn = enrolledCourses?.map((e) => {
    if (e.id === user.id) {
      return e.id;
    }
  });

  return (
    <div className="">
      <div className="page-header gothic color-cyan-dark text-2xl py-5">
        Manage Courses
      </div>

      {courses &&
        courses.map((course, index) => (
          <StudentCourseCard
            key={index}
            course={course}
            setCourses={setCourses}
          />
        ))}
    </div>
  );
};

export default StudentCourseManager;
