import React, { useEffect, useState } from 'react';

import Button from '../Common/Button';
import {getCourseSchedule} from '../../helpers/Teacher.helpers';
import ScheduleCard from './ScheduleCard';


const TeacherCourseManager = ({course}) => {
  const [schedules, setSchedules] = useState();
  const [show,setShow]=useState(false);
  useEffect(() => {
    const fetchSchedules = async () => {
      const res = await getCourseSchedule(course.id);
      setSchedules(res);
      console.log(res);
    };

    fetchSchedules();
  }, []);

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <div className="page-header gothic color-cyan-dark text-2xl py-5">
          Course Schedules
        </div>
        <div className="button-container flex justify-center items-center rounded-full p-3 w-[20px] h-[20px] bg-cyan-dark">
          <Button
            onClick={() => setShow(true)}
            text="+"
            className="p-0 bg-transparent text-xl text-white"
          />
        </div>
      </div>
      {/* {show && <CourseAdd setShow={setShow} setCourses={setCourses} />} */}

      {schedules &&
        schedules.map((schedule, index) => (
          <ScheduleCard key={index} schedule={schedule}/>
        ))}

    </div>
  );
};

export default TeacherCourseManager;
