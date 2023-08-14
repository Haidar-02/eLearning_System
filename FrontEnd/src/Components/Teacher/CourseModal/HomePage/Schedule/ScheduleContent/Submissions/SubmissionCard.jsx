import React, { useState } from "react";
import SubmissionUpdateModel from "./SubmissionUpdateModal";
import Submissions from "./Submissions";


const SubmissionCard = ({ submission,submissions,setSubmissions}) => {
  const {
    id,
    task_id,
    student_id,
    submission_date,
    file_path,
    grade,
    status
  } = submission;
  const [show, setShow] = useState(false);

  return ( 
    
      <div className="flex flex-col p-3 border gap-3 rounded-md bg-cyan-light transition-colors hover:bg-slate-200 m-5">

      <div className="content monster text-xs flex flex-col gap-5 cursor-default">
        <div className="submission_date">
          <span className="font-semibold">Submission Date: </span>
          {submission_date}
        </div>
        <div className="enrollment-limit">
          <span className="font-semibold">File path: </span>
          {file_path}
        </div>
        <div className="enrollment-limit cursor-pointer" onClick={()=>setShow(true)}>
          <span className="font-semibold">Grade: </span>
          {grade}
        </div>
        <div className="enrollment-limit">
          <span className="font-semibold">Status: </span>
          {status}
        </div>
      </div>
      {/* <Button
                onClick={() => deleteTask()}
                text="Delete"
                className="p-0 bg-transparent text-xl text-black"
        /> */}
        {show && (
        <SubmissionUpdateModel
          submission={submission}
          setShow={setShow}
          setSubmissions={setSubmissions}
          submissions={submissions}
        />
      )}
    </div>
 
  );
};

export default SubmissionCard;
