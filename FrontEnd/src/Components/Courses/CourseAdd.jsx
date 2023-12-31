import React, { useEffect, useState } from 'react';
import CustomInput from '../Inputs/CustomInput';
import Modal from '../Common/Modal';
import TextArea from '../Inputs/TextArea';
import { addCourse } from '../../helpers/admin.helpers';
import Button from '../Common/Button';
const initialState = {
  title: '',
  description: '',
  teacher_id: '',
  enrollment_limit: '',
};
const CourseAdd = ({ setShow, setCourses }) => {
  const [state, setState] = useState(initialState);
  const [error, setError] = useState();
  console.log(state);
  function textInputHandler(e) {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  }
  async function handleSave() {
    const { data, errorMessages, message } = await addCourse(state);
    if (errorMessages) {
      setError(errorMessages[0]);
      return;
    } else if (message) {
      setError(message);
      return;
    }
    if (data) {
      console.log(data);
      setCourses((prev) => {
        return [data.course, ...prev];
      });

      setShow(false);
    }
  }

  const { title, description, teacher_id, enrollment_limit } = state;
  console.log(title);
  return (
    <Modal
      setShow={setShow}
      className=" flex flex-col p-5 justify-center rounded-2xl gap-5 min-w-[400px]"
    >
      <CustomInput
        label="Title"
        name="title"
        value={title}
        onChange={textInputHandler}
      />
      <TextArea
        label="Description"
        name="description"
        value={description}
        onChange={textInputHandler}
      />
      <CustomInput
        label="Teacher"
        name="teacher_id"
        value={teacher_id}
        onChange={textInputHandler}
      />
      <CustomInput
        label="Enrollment limit"
        name="enrollment_limit"
        value={enrollment_limit}
        onChange={textInputHandler}
      />
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

export default CourseAdd;
