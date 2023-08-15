import React, { useState } from 'react';

import { replaceObjectById, toBase64 } from '../../helpers/helpers';
import { addTaskSubmission } from '../../helpers/student.helpers';
import Modal from '../Common/Modal';
import Button from '../Common/Button';
import CustomInput from '../Inputs/CustomInput';

const initialState = {
  due_date: '',
  task_id: '',
  file: '',
  file_name: '',
};

const SubmitTask = ({ setMaterial, task, setShow, setSubmission }) => {
  const [state, setState] = useState({
    due_date: task.due_date,
    task_id: task.id,
    file: '',
    file_name: '',
  });

  async function handleSave() {
    const data = await addTaskSubmission(state);

    if (data) {
      setSubmission((prev) => ({
        ...prev,
        file_path: data.submission.file_path,
        status: data.submission.status,
      }));
      setShow(false);
    }
  }

  async function onFileChange(e) {
    const file = e.target.files[0];

    setState((prev) => ({ ...prev, file_name: file.name.split('.')[0] }));
    if (!file) return;
    const base64 = await toBase64(file);
    setState((prev) => ({ ...prev, file: base64 }));
  }

  const { title, description, due_date, task_type } = state;
  return (
    <Modal
      setShow={setShow}
      backDropColor={' hidden '}
      className=" z-30 flex flex-col p-5 justify-center  rounded-2xl gap-5 min-w-[400px] absolut w-full h-full"
    >
      <CustomInput type="file" name="title" onChange={onFileChange} />

      {/* <div className="error text-sm text-red-500 ">{error}</div> */}

      <div className="button-container flex gap-5 justify-end">
        <Button
          text="Submit"
          className=" text-[16px] bg-green text-white p-3 self-end"
          onClick={() => {
            handleSave();
          }}
          disabled={state.file ? false : true}
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

export default SubmitTask;
