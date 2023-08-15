import { useEffect, useState } from "react";
import CustomInput from "../../../Inputs/CustomInput";
import Button from "../../../Common/Button";
import { addFeedback } from "../../../../helpers/Teacher.helpers";

const StudentFeedback = ({feedback,setFeedback,showFeedback}) => {
    const [addError, setAddError] = useState();
    const [state,setState]=useState({...feedback,student_id: showFeedback.id});
    
    function inputHandler(e) {
        const { name, value } = e.target;
        setState((prev) => ({ ...prev, [name]: value }));
    }

    async function handleUpdate() {
        // setFeedback(prevFeedback => ({
        //     ...prevFeedback,
        //     student_id: showFeedback.id
        //   }));
        console.log(state);
        const { data, errorMessages, message } = await addFeedback(state);
        if (errorMessages) {
            setAddError(errorMessages[0]);
          return;
        } else if (message) {
            setAddError(message);
          return;
        }

        let newState=replaceObjectById(feedback.id,state,feedback);
        setFeedback(newState);  
        console.log(feedback);  
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