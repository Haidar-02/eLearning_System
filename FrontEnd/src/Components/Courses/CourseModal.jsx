import React, { useEffect, useState } from 'react';
import Modal from '../Common/Modal';
import Button from '../Common/Button';
import CourseDetails from './CourseDetails';
import CourseEdit from './CourseEdit';

import { editCourse, deleteCourse } from '../../helpers/admin.helpers';

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

  const [editState, setEditState] = useState({
    id,
    title: '',
    description: '',
    teacher: '',
    meet_link: '',
    enrollment_limit: '',
  });
  const [editError, setEditError] = useState();

  const [toggleEdit, setToggleEdit] = useState(false);

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

  const replaceObjectById = (id, newObject, state) => {
    const updatedObjects = state.map((obj) =>
      obj.id === id ? newObject : obj
    );
    return updatedObjects;
  };
  async function handleDelete() {
    setCourses((prev) => {
      const newArr = prev.filter((e) => e.id !== id);
      return newArr;
    });
  }
  async function handleSave() {
    const payload = {
      teacher_id: editState.teacher.id,
      title: editState.title,
      description: editState.description,
      meet_link: editState.meet_link,
      enrollment_limit: editState.enrollment_limit,
    };
    const { data, errorMessages, message } = await editCourse(id, payload);
    if (errorMessages) {
      setEditError(errorMessages[0]);
      return;
    } else if (message) {
      setEditError(message);
      return;
    }
    if (data) {
      setCourses((prev) => {
        const newArr = replaceObjectById(id, editState, prev);
        return newArr;
      });
      setShow(false);
    }
  }
  return (
    <Modal
      setShow={setShow}
      className="dark:bg-slate-700 flex flex-col p-5 justify-center rounded-2xl gap-5 min-w-[400px]"
    >
      {toggleEdit ? (
        <CourseEdit
          state={editState}
          setState={setEditState}
          error={editError}
          course={course}
          className="flex flex-col gap-10"
        />
      ) : (
        <CourseDetails course={course} className="flex flex-col gap-10" />
      )}
      <div className="button-container flex justify-end gap-3">
        <Button
          text={toggleEdit ? 'Save' : 'Edit'}
          onClick={() => {
            if (toggleEdit) {
              handleSave();
            } else {
              setToggleEdit((prev) => !prev);
            }
          }}
          className="text-[16px] bg-green text-white  p-3 self-end "
        />

        <Button
          text="delete"
          onClick={() => {
            deleteCourse(id);
            handleDelete();
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
