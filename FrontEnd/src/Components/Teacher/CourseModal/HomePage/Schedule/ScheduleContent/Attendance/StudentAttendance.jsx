import { useEffect, useState } from "react";
import Button from "../../../../../../Common/Button";
import { addSessionAttendance, getStudentAttendance } from "../../../../../../../helpers/Teacher.helpers";

const StudentAttendance = ({session_id,attendance,setAttendance,showStudentAttendance,initialState}) => {
    const [addError, setAddError] = useState();
    const [error, setError] = useState();

    useEffect(()=>{
        fetchAttendance();
    }, [showStudentAttendance]);

    const fetchAttendance = async () => {
        let student_id = showStudentAttendance.id;
        const { data, errorMessages, message } = await getStudentAttendance(session_id,student_id);
        if (errorMessages) {
            setError(errorMessages[0]);
            return;
          } else if (message) {
            setError(message);
            return;
        }
        if(data.attendance){
          setAttendance(data.attendance);
        } else {
          setAttendance(prevAttendance => ({
            ...prevAttendance,
            student_id: showStudentAttendance.id
        }));        }
      };

    function inputHandler(e) {
        const { name, value } = e.target;
        setAttendance((prev) => ({ ...prev, [name]: value }));
    }

    async function handleUpdate() {
        const { data, errorMessages, message } = await addSessionAttendance(attendance);
        if (errorMessages) {
            setAddError(errorMessages[0]);
          return;
        } else if (message) {
            setAddError(message);
          return;
        }

      }

    return ( 
        <div className="student-attendance">
            <select name="attendance_status" defaultValue={attendance.attendance_status} onChange={inputHandler}>
              <option value="1">Present</option>
              <option value="2">Absent</option>
            </select>


            <div className="add-error text-sm text-red-500 ">{addError}</div>

            <div className="button-container flex gap-5 justify-end">
                <Button
                text="Add"
                className=" text-[16px] bg-green text-white p-3 self-end"
                onClick={() => {
                    handleUpdate();
                }}
                />
            </div>
        </div>
    );
}
 
export default StudentAttendance;