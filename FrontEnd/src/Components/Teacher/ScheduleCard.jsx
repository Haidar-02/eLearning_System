import React, { useState } from 'react';
import Button from '../Common/Button';
import CourseModal from '../Common/CourseModal';




const ScheduleCard = ({ schedule}) => {
const {
    id,
    course_id,
    name,
    start_date,
    end_date
  } = schedule;
  return (
    <div className="flex flex-col p-3 border gap-3">

      <div className="schedule-name">
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
      {/* <div>
      <Button
        text="Add Task"
        onClick={() => setShow((prev) => !prev)}
        className="text-white self-end mr-2 "
      />
      <Button
        text="Add Material"
        onClick={() => setShow((prev) => !prev)}
        className="text-white self-end mr-2 "
      />
      <Button
        text="Add Project"
        onClick={() => setShow((prev) => !prev)}
        className="text-white self-end mr-2 "
      />
      </div> */}

    </div>
  );
};

export default ScheduleCard;
