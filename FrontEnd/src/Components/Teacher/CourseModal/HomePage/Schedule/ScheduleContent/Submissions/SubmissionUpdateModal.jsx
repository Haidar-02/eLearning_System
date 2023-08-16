import { useState } from "react";
import { modifyTaskGrade } from "../../../../../../../helpers/Teacher.helpers";
import CustomInput from "../../../../../../Inputs/CustomInput";
import Button from "../../../../../../Common/Button";
import Modal from "../../../../../../Common/Modal";
import Submissions from "./Submissions";

const SubmissionUpdateModel = ({setShow,submission,submissions,setSubmissions}) => {
    const [state, setState] = useState({...submission,grade:""});
    function inputHandler(e) {
        const { name, value } = e.target;
        setState((prev) => ({ ...prev, [name]: value }));
    } 

      async function handleUpdate() {
        let submission_id=state.id;
        let grade=state.grade;
        const { data, errorMessages, message } = await modifyTaskGrade({submission_id,grade});
        if (errorMessages) {
          setError(errorMessages[0]);
          return;
        } else if (message) {
          setError(message);
          return;
        }
        //   setTasks((prev) => {
        //     return [data.task, ...prev];
        //   });
        console.log(state);
        let newState=replaceObjectById(submission.id,state,submissions);
        console.log(newState)
        setSubmissions(newState);    
        setShow(false);
      }

      const replaceObjectById = (id, newObject, state) => {
        const updatedObjects = state.map((obj) =>
          obj.id === id ? newObject : obj
        );
        return updatedObjects;
      };
    return ( 
        <Modal
        setShow={setShow}
        className="bg-cyan-medium flex flex-col p-5 justify-center rounded-2xl gap-5 min-w-[400px]"
      >
        
  
        <div className="button-container flex justify-end gap-3">
        <CustomInput
            label="Grade"
            name="grade"
            value={state.grade}
            onChange={inputHandler}
            />
          <Button
            text="Add Grade"
            onClick={handleUpdate}
            className="text-[16px] text-white bg-green p-3 self-end "
          />
          <Button
            text="cancel"
            onClick={() => {
              setShow(false);
            }}
            className="text-[16px] bg-transparent text-cyan-600  p-3 self-end "
          />
        </div>
      </Modal> 
     );
}
 
export default SubmissionUpdateModel;