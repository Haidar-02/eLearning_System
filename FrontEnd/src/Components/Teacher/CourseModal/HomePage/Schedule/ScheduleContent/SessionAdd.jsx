import React, { useState } from 'react';
import Modal from '../../../../../Common/Modal';
import { addScheduleSession } from '../../../../../../helpers/Teacher.helpers';
import Button from '../../../../../Common/Button';
const initialState = {
  date:''
};
const SessionAdd = ({ setSessionAdd, setSessions,schedule_id,course_id}) => {
  const [state, setState] = useState(initialState);
  const [error, setError] = useState();
  function inputHandler(e) {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
}

  async function handleSave() {
    const { data, errorMessages, message } = await addScheduleSession({...state,course_id,schedule_id});
    if (errorMessages) {
      setError(errorMessages[0]);
      return;
    } else if (message) {
      setError(message);
      return;
    }
    if (data) {
      setSessions((prev) => {
        return [data.session, ...prev];
      });

      setSessionAdd(false);
    }
  }

  const { date } = state;
  return (
    <Modal
    setShow={setSessionAdd}
    className="bg-cyan-medium flex flex-col p-5 justify-center rounded-2xl gap-5 min-w-[400px]"
    >
    <input type="datetime-local" value={date} name="date" onChange={inputHandler}/>

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
          setSessionAdd(false);
        }}
        className="text-[16px] bg-transparent text-white  p-3 self-end "
      />
    </div>
    </Modal>
  );
};

export default SessionAdd;

