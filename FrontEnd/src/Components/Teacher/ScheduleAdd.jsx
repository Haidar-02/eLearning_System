import React, { useEffect, useState } from 'react';
import CustomInput from '../Inputs/CustomInput';
import Modal from '../Common/Modal';
import TextArea from '../Inputs/TextArea';
import { addSchedule } from '../../helpers/Teacher.helpers';
import Button from '../Common/Button';
const initialState = {
  course_id: '',
  name: '',
  start_date: '',
  end_date: '',
};
const ScheduleAdd = ({ setShow, setSchedules, course_id}) => {
  const [state, setState] = useState(initialState);
  const [error, setError] = useState();
  function textInputHandler(e) {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  }
  async function handleSave() {
    console.log(state)
    // const { data, errorMessages, message } = await addSchedule(state);
    // if (errorMessages) {
    //   setError(errorMessages[0]);
    //   return;
    // } else if (message) {
    //   setError(message);
    //   return;
    // }
    // if (data) {
    //   console.log(data);
    //   setSchedules((prev) => {
    //     return [data.schedule, ...prev];
    //   });

    //   setShow(false);
    // }
  }

  const { name, start_date, end_date } = state;
  console.log(title);
  return (
    <Modal
      setShow={setShow}
      className=" flex flex-col p-5 justify-center rounded-2xl gap-5 min-w-[400px]"
    >
      <CustomInput
        label="Name"
        name="name"
        value={name}
        onChange={textInputHandler}
      />

      <input type="datetime-local" value={start_date} name="start_date"/>
      <input type="datetime-local" value={end_date} name="end_date"/>

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
            setShow(false);
          }}
          className="text-[16px] bg-transparent text-cyan-600  p-3 self-end "
        />
      </div>
    </Modal>
  );
};

export default ScheduleAdd;
