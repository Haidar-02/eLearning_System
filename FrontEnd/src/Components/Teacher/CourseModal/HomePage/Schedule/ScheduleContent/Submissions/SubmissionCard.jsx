import React, { useState } from 'react';
import CustomInput from '../../../../../Inputs/CustomInput';
import Modal from '../../../../../Common/Modal';
import { addScheduleTask } from '../../../../../../helpers/Teacher.helpers';
import Button from '../../../../../Common/Button';
import TextArea from '../../../../../Inputs/TextArea';
const initialState = {
  title: '',
  description: '',
  due_date: '',
  task_type: '1'
};
const TaskAdd = ({ setTaskAdd, setTasks,schedule_id,course_id}) => {
  const [state, setState] = useState(initialState);
  const [error, setError] = useState();
  function inputHandler(e) {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  } 
  async function handleSave() {
    const { data, errorMessages, message } = await addScheduleTask({...state,course_id,schedule_id});
    if (errorMessages) {
      setError(errorMessages[0]);
      return;
    } else if (message) {
      setError(message);
      return;
    }
    if (data) {
      console.log(data);
      setTasks((prev) => {
        return [data.task, ...prev];
      });

      setTaskAdd(false);
    }
  }

  const { title, description, due_date,task_type } = state;
  return (
    <Modal
    setShow={setTaskAdd}
    className=" flex flex-col p-5 justify-center rounded-2xl gap-5 min-w-[400px]"
    >
    <CustomInput
      label="Title"
      name="title"
      value={title}
      onChange={inputHandler}
    />
    <TextArea
      label="Description"
      name="description"
      value={description}
      onChange={inputHandler}
    />
    <input type='datetime-local' name='due_date' value={due_date} onChange={inputHandler}/>
    <label htmlFor="task_type">Task type</label>
    <select name="task_type" onChange={inputHandler}>
      <option value="1">Assignment</option>
      <option value="2">Quiz</option>
    </select>
    <div className="error text-sm text-red-500 ">{error}</div>

    <div className="button-container flex gap-5 justify-end">
      <Button
        text="Create"
        className=" text-[16px] bg-green text-white p-3 self-end"
        onClick={() => {
          handleSave();
        }}
      />
      <Button
        text="cancel"
        onClick={() => {
          setTaskAdd(false);
        }}
        className="text-[16px] bg-transparent text-cyan-600  p-3 self-end "
      />
    </div>
    </Modal>
  );
};

export default TaskAdd;

