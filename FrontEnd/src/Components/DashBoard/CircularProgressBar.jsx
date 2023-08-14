import React, { useEffect, useState } from 'react';
import { CircularProgressbar as ReactCircularProgressbar } from 'react-circular-progressbar';

function CourseProgressbar({ targetPercentage }) {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (percentage < targetPercentage) {
      const timer = setInterval(() => {
        setPercentage(prevPercentage => prevPercentage + 1);
      }, 20);

      return () => {
        clearInterval(timer);
      };
    }
  }, [percentage, targetPercentage]);

  return (
    <div className="course-progress-bar">
      <h4 >Course Completion Progress</h4>
      <div className="progress-bar-container">
        <ReactCircularProgressbar
          value={percentage}
          text={`${percentage.toFixed(2)}%`}
          strokeWidth={10}
          styles={{
            trail: {
              stroke: '#d6d6d6',
            },
            text: {
              fill: '#333',
              fontSize: '14px',
            },
          }}
        />
      </div>
    </div>
  );
}

export default CourseProgressbar;
