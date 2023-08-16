import React, { useEffect, useState } from 'react';

import Button from '../../Components/Common/Button';
import { getAllCourses } from '../../helpers/common.helpers';

import CourseAdd from '../../Components/Courses/CourseAdd';
import StudentCourseCard from './StudentCourseCard';
import { getEnrolledCourses } from '../../helpers/student.helpers';

const StudentCourseManager = ({ className }) => {
  const [courses, setCourses] = useState();
  const [enrolledCourses, setEnrolledCourses] = useState();
  const [viewEnrolled, setViewEnrolled] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await getAllCourses();
      setCourses(res);
    };
    const fetchEnrolled = async () => {
      const res = await getEnrolledCourses();
      setEnrolledCourses(res);
    };

    fetchCourses();
    fetchEnrolled();
  }, []);

  const enrolledIn = enrolledCourses?.map((e) => e.id);
  console.log(viewEnrolled);
  return (
    <div className={`${className}`}>
      <div className="flex items-center justify-between">
        <div className="page-header gothic color-cyan-dark text-2xl py-5">
          {viewEnrolled ? 'Enrolled Courses' : 'All Courses'}
        </div>
        <Button
          onClick={() => {
            setViewEnrolled((prev) => !prev);
          }}
          text={`View ${viewEnrolled ? 'all' : 'enrolled'}`}
          className="text-white mr-6"
        />
      </div>
      {!viewEnrolled
        ? courses &&
          enrolledCourses &&
          courses.map((course, index) => (
            <StudentCourseCard
              key={index}
              course={course}
              setEnrolledCourses={setEnrolledCourses}
              enrolledIn={enrolledIn}
            />
          ))
        : courses &&
          enrolledCourses &&
          enrolledCourses.map((course, index) => (
            <StudentCourseCard
              key={index}
              course={course}
              setEnrolledCourses={setEnrolledCourses}
              enrolledIn={enrolledIn}
              details
            />
          ))}
    </div>
  );
};

export default StudentCourseManager;
