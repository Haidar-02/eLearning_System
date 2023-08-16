import React, { useState, useEffect } from 'react';
import {
  getEnrolledCourses,
  getStudentProgressDetails,
} from '../../helpers/student.helpers';
import { getUnique, compareDates } from '../../helpers/helpers';
// ['date', 'grades'],
// ['2014', 1000],
// ['2015', 1170],
// ['2016', 660],
// ['2017', 1030],
const CourseSelect = ({ setTasks, setTotal, setGraphData }) => {
  const [courses, setCourses] = useState();

  useEffect(() => {
    const fetchEnrolled = async () => {
      const res = await getEnrolledCourses();
      setCourses(res);
    };

    fetchEnrolled();
  }, []);

  const populateData = (graded) => {
    let arr = [];
    let sorted = graded.sort(compareDates);
    sorted.forEach((e) => {
      arr.push([e.submission_date, e.grade]);
    });
    setGraphData(arr);
  };
  return (
    <div className="border border-cyan-600 rounded-2xl p-3">
      <span className="title  text-base font-bold ">Courses</span>
      {courses &&
        courses.map((course, index) => (
          <>
            <div className="flex flex-col  text-xs ">
              <span
                className="border-t py-2 cursor-pointer hover:bg-gray-100"
                key={index}
                onClick={async () => {
                  const res = await getStudentProgressDetails(course.id);
                  const {
                    submitted_tasks,
                    graded_tasks,
                    ungraded_tasks,
                    total_tasks,
                  } = res.data;
                  console.log(res.data);
                  if (submitted_tasks) {
                    const submitted = getUnique(submitted_tasks);
                    setTasks(submitted);
                    setTotal(total_tasks);
                    populateData(graded_tasks);
                  }
                }}
              >
                {course.title}
              </span>
            </div>
          </>
        ))}
    </div>
  );
};

export default CourseSelect;
