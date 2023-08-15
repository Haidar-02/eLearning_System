import React, { useEffect, useState } from 'react';
import { getTaskSubmissions } from '../../helpers/common.helpers';
import { getUser } from '../../helpers/helpers';
import Button from '../Common/Button';
import SubmitTask from './SubmitTask';
const StudentMaterialCard = ({
  material,
  button,
  className,
  task,
  setMaterial,
}) => {
  const [submission, setSubmission] = useState();
  const [show, setShow] = useState();
  useEffect(() => {
    if (task) {
      const fetchSubmission = async () => {
        const res = await getTaskSubmissions(task.id);
        const { id } = getUser();
        const userSubmission = res.find(
          (e) => e.task_id === task.id && e.student_id === id
        );
        setSubmission(userSubmission);
      };

      fetchSubmission();
    }
  }, []);
  return (
    <>
      {material ? (
        <div
          className={`flex flex-col  p-5 border-t gap-3 text-start  transition-colors ${className}`}
        >
          <div className="material-title text-start">
            <span className="text-md font-bold uppercase hover:underline">
              {material.title}
            </span>
          </div>
          <div className="content monster text-xs flex flex-col items-start gap-5 cursor-default">
            <div className="description">
              <span className="font-semibold">Content: </span>
              {material.content}
            </div>
            <div className="enrollment-limit">
              <span className="font-semibold">File: </span>
              {material.file_path}
            </div>
          </div>
          {button}
        </div>
      ) : (
        <div
          className={`flex flex-col relative  p-5 border-t gap-3 text-start  transition-colors ${className}`}
        >
          {show && (
            <SubmitTask
              task={task}
              setShow={setShow}
              setMaterial={setMaterial}
              setSubmission={setSubmission}
            />
          )}
          <div className="material-title text-start">
            <span className="text-md font-bold uppercase hover:underline">
              {task.title}
            </span>
          </div>
          <div className="content monster text-xs flex flex-col items-start gap-5 cursor-default">
            <div className="description">
              <span className="font-semibold">Description: </span>
              {task.description}
            </div>
            <div className="enrollment-limit">
              <span className="font-semibold">Due: </span>
              {task.due_date}
            </div>
            <div className="enrollment-limit">
              <span className="font-semibold">File: </span>
              {submission && submission.file_path}
            </div>
            <div className="enrollment-limit">
              <span className="font-semibold">Status: </span>
              {submission && submission.status}
            </div>
          </div>
          <div className=" w-[16px] h-[16px] rounded-full">
            {button}
            <Button
              text={'Add'}
              className={' text-white'}
              onClick={() => {
                setShow(true);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default StudentMaterialCard;
