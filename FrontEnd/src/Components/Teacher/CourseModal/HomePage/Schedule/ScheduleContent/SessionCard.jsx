import React, { useState } from "react";
import Button from "../../../../../Common/Button";
import { removeScheduleSession } from "../../../../../../helpers/Teacher.helpers";
import Submissions from "./Submissions/Submissions";

const SessionCard = ({ session,setSessions,setShowAttendance}) => {
  const {
    id,
    date,
    course_id,
    schedule_id
  } = session;
  const deleteSession = async () => {
    const res = await removeScheduleSession(id);
    setSessions((prev)=>prev.filter(i => i.id !== id));
};
  return ( 
      <div className="flex flex-col p-3 border gap-3 rounded-md transition-colors bg-cyan-light m-5 hover:bg-slate-200">
      <div
        className="course-title cursor-pointer" onClick={()=>setShowAttendance({show:true,id:id})}
      >
        <span className="text-md font-bold uppercase hover:underline">
          Session
        </span>
      </div>
      <div className="content monster text-xs flex flex-col gap-5 cursor-default">
        <div className="description">
          <span className="font-semibold">Date: </span>
          {date}
        </div>
      </div>
      <Button
                onClick={() => deleteSession()}
                text="Delete"
                className="p-0 bg-green text-xl text-white"
        />
    </div>
 
  );
};

export default SessionCard;
