import { useEffect, useState } from "react";
import CustomInput from "../../../Inputs/CustomInput";
import Button from "../../../Common/Button";
import { addFeedback } from "../../../../helpers/Teacher.helpers";

const StudentFeedback = ({feedback,setFeedback,error,showFeedback,fetchFeedback}) => {

    function inputHandler(e) {
        const { name, value } = e.target;
        setFeedback((prev) => ({ ...prev, [name]: value }));
    }
    useEffect(()=>{
        fetchFeedback()
    },[showFeedback])


    async function handleUpdate() {
        setFeedback((prev) => ({ ...prev, student_id:showFeedback.id}));
        const { data, errorMessages, message } = await addFeedback(feedback);
        if (errorMessages) {
          setError(errorMessages[0]);
          return;
        } else if (message) {
          setError(message);
          return;
        }

        console.log(state);
        let newState=replaceObjectById(group.id,state,groups);
        console.log(newState)
        setGroups(newState);    
        setShow(false);
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

            <div className="error text-sm text-red-500 ">{error}</div>

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