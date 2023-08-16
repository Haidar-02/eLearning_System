import React, { useEffect, useState } from "react";
import { getChildFeedbacks } from "../../helpers/parent.helper";

const ChildFeedbacks = () => {
  const childId = 4;
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchChildFeedbacks = async () => {
      try {
        const response = await getChildFeedbacks(childId);
        if (response && response.status === 200) {
          setFeedbacks(response.feedbacks);
        }
      } catch (error) {
        console.log(`Failed to fetch child feedbacks: ${error.message}`);
      }
    };

    fetchChildFeedbacks();
  }, [childId]);

  return (
    <div className="w-96 cursor-default">
      <h2 className="font-black text-xl">Child Feedbacks</h2>
      <div className="mt-4 w-full">
        {feedbacks.map((feedback) => (
          <div
            key={feedback.id}
            className="border rounded-md p-3 mb-2 bg-white shadow-md  hover:bg-gray-200 hover:scale-105 transition-all"
          >
            <div>
              <strong>Teacher:</strong> {feedback.teacher.name} ~{" "}
              {feedback.teacher.email}
            </div>
            <div>
              <strong>Course:</strong> {feedback.course.title}
            </div>
            <div className="m-2 bg-cyan-700 text-white p-2 rounded-lg flex-col flex-wrap">
              <strong>Feedback</strong> <br />{" "}
              <p className="break-words">{feedback.comment} </p>
            </div>
          </div>
        ))}
        {feedbacks.length === 0 && <p>No feedbacks available.</p>}
      </div>
    </div>
  );
};

export default ChildFeedbacks;
