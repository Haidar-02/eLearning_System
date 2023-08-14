import React, { useEffect, useState } from 'react';

import Button from '../../Common/Button';
import {getCourseSchedules} from '../../../helpers/common.helpers';
import ScheduleCard from './ScheduleCard';
import ScheduleAdd from './ScheduleAdd';
import ScheduleContent from './ScheduleContent';

const TeacherCourseManager = ({course}) => {
  const [schedules, setSchedules] = useState();
  const [show,setShow]=useState(false);
  const [showScheduleContent,setScheduleContent]=useState({show:false,id:null});

  useEffect(() => {
    const fetchSchedules = async () => {
      const res = await getCourseSchedules(course.id);
      setSchedules(res);
      console.log(res);
    };

    fetchSchedules();
  }, []);
  return (
    <div className="">
      
      {show ? 
      <ScheduleAdd setShow={setShow} setSchedules={setSchedules} course_id={course.id}/> 
      :
      (
        <>
        {showScheduleContent.show ? 
          <ScheduleContent schedule_id={showScheduleContent.id} course_id={course.id} setScheduleContent={setScheduleContent}/>
        :
        <>
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
          {
            schedules &&
            schedules.map((schedule, index) => (
              <>
              <ScheduleCard key={index} schedule={schedule} setSchedules={setSchedules} setScheduleContent={setScheduleContent}/>
              </>
            ))
          }
        </>
      }
      </>
      )
      }

    </div>
  );
};

export default TeacherCourseManager;
