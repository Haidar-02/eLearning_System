import React, { useState } from "react";
import Button from "../../../../../Common/Button";
import { removeScheduleTask } from "../../../../../../helpers/Teacher.helpers";
import Submissions from "./Submissions/Submissions";

const TaskCard = ({ task,setTasks,setShowSubmissions}) => {
  const {
    id,
    schedule_id,
    course_id,
    title,
    max_score,
    teacher_id,
    description,
    due_date,
    task_type
  } = task;

  const deleteTask = async () => {
    const res = await removeScheduleTask(id);
    setTasks((prev)=>prev.filter(i => i.id !== id));
};
  return ( 
      <div className="flex flex-col p-3 border gap-3 rounded-md transition-colors bg-cyan-light m-5 hover:bg-slate-200">
      <div
        className="course-title cursor-pointer" onClick={()=>setShowSubmissions({show:true,task_id:id})}
      >
        <span className="text-md font-bold uppercase hover:underline">
          {title}
        </span>
      </div>
      <div className="content monster text-xs flex flex-col gap-5 cursor-default">
        <div className="description">
          <span className="font-semibold">Description: </span>
          {description}
        </div>
        <div className="enrollment-limit">
          <span className="font-semibold">Due date: </span>
          {due_date}
        </div>
      </div>
      <Button
                onClick={() => deleteTask()}
                text="Delete"
                className="p-0 bg-green text-xl text-white"
        />
    </div>
 
  );
};

export default TaskCard;
