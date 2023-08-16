import React, { useState } from 'react';
import {
  getScheduleMaterials,
  getScheduleTasks,
} from '../../helpers/common.helpers';

const StudentCourseSchedual = ({ schedule, className, setMaterial }) => {
  const { id, course_id, name, start_date, end_date } = schedule;

  return (
    <div
      onClick={async () => {
        const materials = await getScheduleMaterials(id);
        const tasks = await getScheduleTasks(id);

        setMaterial({ materials, tasks });
      }}
      className={`flex flex-col p-3 border gap-3 border-b ${className} `}
    >
      <div className="schedule-name">
        <span className=" font-semibold text-md">{name}</span>
      </div>
      <div className="content  text-xs flex flex-col gap-2">
        <div className="start-date">
          <span className="font-semibold underline">Start Date: </span>
          {start_date}
        </div>
        <div className="end-date">
          <span className="font-semibold underline">End Date: </span>
          {end_date}
        </div>
      </div>
    </div>
  );
};

export default StudentCourseSchedual;
