import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';

import CourseSelect from './CourseSelect';

const StudentProgress = () => {
  const [tasks, setTasks] = useState();
  const [total, setTotal] = useState();
  const [graphData, setGraphData] = useState();

  const initialState = [
    ['data', 'grades'],
    ['0', 0],
  ];

  const options = {
    chart: {
      title: 'Grades',
    },
  };

  return (
    <div className="grow min-w-full min-h-full">
      <div className="flex gap-5">
        <CourseSelect
          setTasks={setTasks}
          setTotal={setTotal}
          setGraphData={setGraphData}
        />
        <div className=" rounded-2xl p-3 grow">
          <div className="title    text-base font-bold border-b">Tasks</div>
          {tasks &&
            tasks.map((e) => {
              const {
                task: { title },
                grade,
                submission_date,
              } = e;
              return (
                <div className="task-container border-t py-2 ">
                  <div className="title font-semibold text-sm ">
                    <u> Title:</u> {title}
                  </div>
                  <div className="flex gap-5 text-sm">
                    <div className="date flex gap-2">
                      <span className="date  font-semibold">Date: </span>
                      <span>{submission_date}</span>
                    </div>
                    <div className="grade flex gap-2">
                      <span className="font-semibold">Grade: </span>
                      <span>{grade ? grade : 'Not graded yet'}</span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="chart-container mt-20">
        <Chart
          chartType="Bar"
          width="100%"
          height="400px"
          data={graphData ? [['data', 'grades'], ...graphData] : initialState}
          options={options}
        />
      </div>
    </div>
  );
};

export default StudentProgress;
