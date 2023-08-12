import React, { useEffect, useState } from 'react';
import CustomInput from '../Inputs/CustomInput';

const CourseEdit = ({ state, setState, error }) => {
  const [show, setShow] = useState(false);

  function textInputHandler(e) {
    const { value, name } = e.target;
    if (name === 'teacher') {
      setState((prev) => ({
        ...prev,
        teacher: { ...prev.teacher, id: value },
      }));
    } else {
      setState((prev) => ({ ...prev, [name]: value }));
    }
  }
  console.log(state);
  return (
    <div>
      <CustomInput
        label="Title"
        name="title"
        value={state.title}
        onChange={textInputHandler}
      />
      <CustomInput
        label="Description"
        name="description"
        type="textarea"
        value={state.description}
        onChange={textInputHandler}
      />
      <CustomInput
        label="Teacher"
        name="teacher"
        value={state.teacher.id}
        onChange={textInputHandler}
      />
      <CustomInput
        label="meet"
        name="meet_link"
        value={state.meet_link}
        onChange={textInputHandler}
      />
      <CustomInput
        label="Enrollment limit"
        name="enrollment_limit"
        value={state.enrollment_limit}
        onChange={textInputHandler}
      />

      <div className="error text-sm text-red-500 ">{error}</div>
    </div>
  );
};

export default CourseEdit;
