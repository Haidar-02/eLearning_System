import React, { useEffect, useState } from "react";
import { getChildTasksAndGrades } from "../../helpers/parent.helper";

const ChildTasksGrades = ({ child_id }) => {
  const [tasksAndGrades, setTasksAndGrades] = useState([]);

  useEffect(() => {
    const fetchTasksAndGrades = async () => {
      const response = await getChildTasksAndGrades(child_id);
      if (response && response.status === 200) {
        setTasksAndGrades(response.tasksAndGrades);
      }
    };

    fetchTasksAndGrades();
  }, [child_id]);

  const formatDate = (dateString) => {
    if (!dateString) {
      return "Not Submitted";
    }

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  console.log(tasksAndGrades);

  return (
    <div className="flex-col w-96 pt-2">
      <h2 className="font-black text-xl">Child Tasks and Grading</h2>
      <div className="flex mt-2 gap-2 border-t-2 pt-3 cursor-default">
        <div className="bg-green-500 px-3 py-1 rounded-lg text-white">Done</div>
        <div className="bg-gray-600 px-3 py-1 rounded-lg text-white">
          Missing
        </div>
      </div>
      <div className="flex-col  mt-2 pt-3">
        {tasksAndGrades.length === 0 ? (
          <p>No tasks available</p>
        ) : (
          tasksAndGrades.map((task) => (
            <div
              key={task.id}
              className={`${
                task.is_done ? "bg-green-600" : "bg-gray-600"
              } px-3 py-2 rounded-lg text-white w-full flex-col m-3 cursor-default hover:scale-105 transition-all`}
            >
              <div className="flex justify-between border-b-2 mb-2 pb-2">
                {task.title}
                {task.grade !== 0 && task.grade !== null ? (
                  <span
                    className={`${
                      task.grade < task.max_score / 2 && task.grade > 0
                        ? "bg-red-500"
                        : "bg-transparent"
                    } px-2 rounded-full`}
                  >
                    Grade: {task.grade} / <strong>{task.max_score}</strong>
                  </span>
                ) : (
                  <span>
                    No Grade / <strong>{task.max_score}</strong>
                  </span>
                )}
              </div>

              <div className="text-sm flex-col">
                <div>
                  {task.is_done ? (
                    <div>
                      Submission Date ~{" "}
                      <strong>{formatDate(task.submission_date)}</strong>
                    </div>
                  ) : (
                    <div>Not Submitted</div>
                  )}
                </div>

                <div>
                  {" "}
                  Due Date ~ <strong>{formatDate(task.due_date)}</strong>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChildTasksGrades;
