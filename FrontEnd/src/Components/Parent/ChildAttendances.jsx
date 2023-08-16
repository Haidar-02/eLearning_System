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
    <div className="m-5 cursor-default w-96">
      <div>
        <h2 className="font-black text-lg">Child Attendances</h2>
        <div className="flex mt-2 gap-2 border-t-2 pt-3 cursor-default">
          <div className="bg-green-600 px-3 py-1 rounded-lg text-white">
            Present
          </div>
          <div className="bg-gray-600 px-3 py-1 rounded-lg text-white">
            Late
          </div>
          <div className="bg-red-500 px-3 py-1 rounded-lg text-white">
            Absent
          </div>
        </div>
        <div className="mt-7 w-full">
          {attendances.map((attendance) => (
            <div
              key={attendance.id}
              className={`border rounded-md p-3 mb-3 bg-white shadow-md hover:scale-105 transition-all`}
            >
              <div>
                <strong>Date:</strong> {formatDate(attendance.date)}
              </div>
              <div className="mt-2">
                <strong>Status:</strong>{" "}
                {attendance.attendance_status === 1 && (
                  <span className="px-2 py-1 rounded-full bg-red-600 text-white">
                    Abscent
                  </span>
                )}
                {attendance.attendance_status === 2 && (
                  <span className="px-2 py-1 rounded-full bg-gray-600 text-white">
                    Late
                  </span>
                )}
                {attendance.attendance_status === 3 && (
                  <span className="px-2 py-1 rounded-full bg-green-600 text-white">
                    Present
                  </span>
                )}
              </div>
            </div>
          ))}
          {attendances.length === 0 && <p>No attendances available to see.</p>}
        </div>
      </div>
    </div>
  );
};

export default ChildAttendances;
