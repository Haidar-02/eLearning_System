import React, { useEffect, useState } from 'react';
import Modal from '../Common/Modal';
import Button from '../Common/Button';
import CourseDetails from './CourseDetails';
import CourseEdit from './CourseEdit';
const falseState = {
  details: false,
  edit: false,
};
const CourseModal = ({ course, setShow, setCourses }) => {
  console.log(course);
  const {
    class_code,
    description,
    enrollment_limit,
    id,
    meet_link,
    teacher,
    title,
  } = course;
  const { id: teacher_id, name, email } = teacher;
  const [editState, setEditState] = useState({
    id,
    title: '',
    description: '',

    teacher: '',

    meet_link: '',
    enrollment_limit: '',
  });

  useEffect(() => {
    setEditState({
      id,
      teacher: { ...teacher },

      title,
      description,
      meet_link,
      enrollment_limit,
    });
  }, []);

  const [state, setState] = useState({
    details: true,
    edit: false,
  });

  const toggleState = (page) => {
    setState({ ...falseState, [page]: true });
  };

  const replaceObjectById = (id, newObject, state) => {
    const updatedObjects = state.map((obj) =>
      obj.id === id ? newObject : obj
    );
    return updatedObjects;
  };

  const { details, edit } = state;
  return (
    <Modal
      setShow={setShow}
      className=" flex flex-col p-5 justify-center rounded-2xl gap-5"
    >
      {details && (
        <CourseDetails course={course} className="flex flex-col gap-10" />
      )}

      {edit && (
        <CourseEdit
          state={editState}
          setState={setEditState}
          course={course}
          className="flex flex-col gap-10"
        />
      )}
      <div className="button-container flex justify-end gap-3">
        <Button
          text={edit ? 'Save' : 'Edit'}
          onClick={() => {
            if (edit) {
              setCourses((prev) => {
                const newArr = replaceObjectById(id, editState, prev);
                return newArr;
              });
            } else {
              toggleState('edit');
            }
          }}
          className="text-[16px] bg-green text-white  p-3 self-end "
        />

        <Button
          text="delete"
          onClick={() => {
            setShow(false);
          }}
          className="text-[16px] text-white bg-red-dark  p-3 self-end "
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

export default CourseModal;
