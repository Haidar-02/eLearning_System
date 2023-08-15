import { useEffect, useState } from "react";
import CustomInput from "../../../Inputs/CustomInput";
import Button from "../../../Common/Button";
import { addFeedback } from "../../../../helpers/Teacher.helpers";
import { getStudentFeedback } from "../../../../helpers/common.helpers";

const StudentFeedback = ({course_id,feedback,setFeedback,showFeedback}) => {
    const [addError, setAddError] = useState();
    const [error, setError] = useState();

    useEffect(()=>{
        setFeedback({...feedback,student_id: showFeedback.id});
    },[showFeedback])
    useEffect(() => {

        fetchFeedback();
        
    }, [showFeedback]);

    const fetchFeedback = async () => {
        let student_id = showFeedback.id;
        const { data, errorMessages, message } = await getStudentFeedback(course_id,student_id);
        if (errorMessages) {
            setError(errorMessages[0]);
            return;
          } else if (message) {
            setError(message);
            return;
        }
        if(data.feedback){
          setFeedback(data.feedback);
        } else {
          setFeedback(initialState);
        }
      };

    function inputHandler(e) {
        const { name, value } = e.target;
        setFeedback((prev) => ({ ...prev, [name]: value }));
    }

    async function handleUpdate() {
        const { data, errorMessages, message } = await addFeedback(feedback);
        if (errorMessages) {
            setAddError(errorMessages[0]);
          return;
        } else if (message) {
            setAddError(message);
          return;
        }

      }

    return ( 
        <div className="student-feedback">
            <CustomInput
                label="Rating"
                name="rating"
                value={feedback.rating}
                onChange={inputHandler}
            />

            <CustomInput
                label="Comment"
                name="comment"
                value={feedback.comment}
                onChange={inputHandler}
            />

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
 
export default StudentFeedback;