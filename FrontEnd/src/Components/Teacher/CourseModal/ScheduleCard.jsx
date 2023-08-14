import React, { useState } from 'react';
import Button from '../../Common/Button';
import { removeSchedule } from '../../../helpers/Teacher.helpers';



const ScheduleCard = ({ schedule,setSchedules,setScheduleContent}) => {



  const deleteSchedule = async (schedule_id) => {
    const res = await removeSchedule(schedule_id);
    setSchedules((prev)=>prev.filter(i => i.id !== schedule_id));
};


const {
    id,
    course_id,
    name,
    start_date,
    end_date
  } = schedule;
  return (
    <div className="flex flex-col p-3 border gap-3">
        <div className="schedule-name cursor-pointer" onClick={()=>setScheduleContent({id:schedule.id,show:true})}>
          <span className="gothic font-semibold text-md">{name}</span>
        </div>
        <div className="content monster text-xs flex flex-col gap-2">
          <div className="start-date">
            <span className="font-semibold underline">Start Date: </span>
            {start_date}
          </div>
          <div className="end-date">
            <span className="font-semibold underline">End Date: </span>
            {end_date}
          </div>
        </div>
        <Button
                onClick={() => deleteSchedule(id)}
                text="Delete"
                className="p-0 bg-transparent text-xl text-black"
        />
    </div>
  );
};

export default ScheduleCard;
