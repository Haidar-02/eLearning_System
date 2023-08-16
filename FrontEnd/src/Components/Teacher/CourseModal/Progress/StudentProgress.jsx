import { useEffect, useState } from "react";
import CustomInput from "../../../Inputs/CustomInput";
import Button from "../../../Common/Button";
import { addFeedback } from "../../../../helpers/Teacher.helpers";
import { getStudentFeedback, getStudentProgress } from "../../../../helpers/common.helpers";

const StudentProgress = ({course_id,showProgress}) => {
    const [error, setError] = useState();
    const [progress,setProgess]=useState();

    useEffect(() => {

        fetchProgress();
        
    }, [showProgress]);

    const fetchProgress = async () => {
        let student_id = showProgress.id;
        const { data, errorMessages, message } = await getStudentProgress(course_id,student_id);
        if (errorMessages) {
            setError(errorMessages[0]);
            return;
          } else if (message) {
            setError(message);
            return;
        }
        if(data){
          setProgess(data);
        } 
      };

    return ( 
        <div className="student-feedback">
          <div className="content monster text-xs flex flex-row gap-2 justify-around">
          <div className="submitted-tasks">
            <span className="font-semibold underline">Submitted Tasks: </span>
            {progress && progress.submitted_tasks}
          </div>
          <div className="succeeded-tasks">
            <span className="font-semibold underline">Succeeded Tasks: </span>
            {progress &&progress.succeeded_tasks}
          </div>
          <div className="ungraded-tasks">
            <span className="font-semibold underline">Ungraded Tasks: </span>
            { progress && progress.ungraded_tasks}
          </div>
        </div>

            <div className="error text-sm text-red-500 ">{error}</div>

        </div>
    );
}
 
export default StudentProgress