import React, { useState, useEffect } from 'react';
import StudentCourseCard from './StudentCourseCard';
import {
  getEnrolledCourses,
  getStudentProgressDetails,
} from '../../helpers/student.helpers';
import { getTaskSubmissions } from '../../helpers/common.helpers';

import { getUser } from '../../helpers/helpers';

const StudentProgress = () => {
  const [courses, setCourses] = useState();
  const [tasks, setTasks] = useState();
  const [total, setTotal] = useState();

  useEffect(() => {
    const fetchEnrolled = async () => {
      const res = await getEnrolledCourses();
      setCourses(res);
    };

    fetchEnrolled();
  }, []);

  function getUnique(submissions) {
    const uniqueSubmissionsMap = new Map();
    submissions.forEach((submission) => {
      uniqueSubmissionsMap.set(submission.task_id, submission);
    });
    const uniqueSubmissions = Array.from(uniqueSubmissionsMap.values());
    return uniqueSubmissions;
  }
  console.log(tasks);
  return (
    <div className="w-[400px]">
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
                    const { submitted_tasks, ungraded_tasks, total_tasks } =
                      res.data;
                    if (submitted_tasks) {
                      const submitted = getUnique(submitted_tasks);
                      setTasks(submitted);
                      setTotal(total_tasks);
                    }
                  }}
                >
                  {course.title}
                </span>
              </div>
            </>
          ))}
      </div>
      <div className=" rounded-2xl p-3 mt-10">
        <div className="title  text-base font-bold border-b">Tasks</div>
        {tasks &&
          tasks.map((e) => {
            const {
              task: { title },
              grade,
              submission_date,
            } = e;
            return (
              <div className="task-container border-t py-2 ">
                <div className="title font-semibold text-sm ">
                  <u> Title:</u> {title}
                </div>
                <div className="flex gap-5 text-sm">
                  <div className="date flex gap-2">
                    <span className="date  font-semibold">Date: </span>
                    <span>{submission_date}</span>
                  </div>
                  <div className="grade flex gap-2">
                    <span className="font-semibold">Grade: </span>
                    <span>{grade ? grade : 'Not graded yet'}</span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default StudentProgress;
