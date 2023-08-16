import React, { useEffect, useState } from "react";
import { getChildAttendance } from "../../helpers/parent.helper";

const formatDate = (dateString) => {
  if (!dateString) {
    return "Not Available";
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

const getStatusStyle = (status) => {
  if (status === 1) {
    return {
      backgroundColor: "red",
      color: "white",
    };
  } else if (status === 2) {
    return {
      backgroundColor: "gray",
      color: "white",
    };
  } else if (status === 3) {
    return {
      backgroundColor: "green",
      color: "white",
    };
  }
};

const ChildAttendances = ({ childId }) => {
  const [attendances, setAttendances] = useState([]);

  useEffect(() => {
    const fetchChildAttendances = async () => {
      try {
        const response = await getChildAttendance(childId);
        if (response && response.status === 200) {
          setAttendances(response.data);
        }
      } catch (error) {
        console.log(`Failed to fetch child attendances: ${error.message}`);
      }
    };

    fetchChildAttendances();
  }, [childId]);

  console.log(attendances);
  return (
    <div className="m-5">
      <div>
        <h2 className="font-black text-lg">Child Attendances</h2>
        <div className="flex mt-2 gap-2 border-t-2 pt-3 cursor-default">
          <div
            style={getStatusStyle(3)}
            className="bg-green-500 px-3 py-1 rounded-lg text-white"
          >
            Present
          </div>
          <div
            style={getStatusStyle(2)}
            className="bg-gray-600 px-3 py-1 rounded-lg text-white"
          >
            Late
          </div>
          <div
            style={getStatusStyle(1)}
            className="bg-red-600 px-3 py-1 rounded-lg text-white"
          >
            Absent
          </div>
        </div>
        <div className="mt-4">
          {attendances.map((attendance) => (
            <div
              key={attendance.id}
              className="border rounded-md p-3 mb-2 bg-white shadow-md"
            >
              <div>
                <strong>Date:</strong> {formatDate(attendance.date)}
              </div>
              <div>
                <strong>Status:</strong> {attendance.attendance_status}
              </div>
            </div>
          ))}
          {attendances.length === 0 && <p>No attendances available.</p>}
        </div>
      </div>
    </div>
  );
};

export default ChildAttendances;
