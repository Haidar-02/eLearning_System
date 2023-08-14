import React, { useState } from 'react';
import CustomInput from '../../Inputs/CustomInput';
import { addSchedule } from '../../../helpers/Teacher.helpers';
import Button from '../../Common/Button';
const initialState = {
  name: '',
  start_date: '',
  end_date: '',
};
const ScheduleAdd = ({ setShow, setSchedules, course_id}) => {
  const [state, setState] = useState(initialState);
  const [error, setError] = useState();
  function inputHandler(e) {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  }
  async function handleSave() {
    const { data, errorMessages, message } = await addSchedule({...state,course_id});
    if (errorMessages) {
      setError(errorMessages[0]);
      return;
    } else if (message) {
      setError(message);
      return;
    }
    if (data) {
      console.log(data);
      setSchedules((prev) => {
        return [data.schedule, ...prev];
      });

      setShow(false);
    }
  }

  const { name, start_date, end_date } = state;
  return (
    <div
      className=" flex flex-col p-5 justify-center rounded-2xl gap-5 min-w-[400px]"
    >
      <CustomInput
        label="Name"
        name="name"
        value={name}
        onChange={inputHandler}
      />

      <input type="datetime-local" value={start_date} name="start_date" onChange={inputHandler}/>
      <input type="datetime-local" value={end_date} name="end_date" onChange={inputHandler}/>

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
          text="Return"
          onClick={() => {
            setShow(false);
          }}
          className="text-[16px] bg-transparent text-cyan-600  p-3 self-end "
        />
      </div>
    </div>
  );
};

export default ScheduleAdd;
