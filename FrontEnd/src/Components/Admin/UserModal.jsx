import React, { useEffect, useState } from 'react';
import Modal from '../Common/Modal';
import Button from '../Common/Button';
import UserDetails from './UserDetails';
import UserEdit from './UserEdit';

import { editUser, deleteUser } from '../../helpers/admin.helpers';

const UserModal = ({ user, setShow, setUsers }) => {
  console.log(user);
  const {
    id,
    name,
    email,
    password,
    user_type,
  } = user;

  const [editState, setEditState] = useState({
    id,
    name:'',
    email:'',
    password:'',
    user_type:'',
  });

  const [editError, setEditError] = useState();
  const [toggleEdit, setToggleEdit] = useState(false);

  useEffect(() => {
    setEditState({
    id,
    name,
    email,
    password,
    user_type,
    });
  }, []);

  const replaceObjectById = (id, newObject, state) => {
    const updatedObjects = state.map((obj) =>
      obj.id === id ? newObject : obj
    );
    return updatedObjects;
  };
  async function handleDelete() {
    setUsers((prev) => {
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
    const { data, errorMessages, message } = await editUser(id, payload);
    if (errorMessages) {
      setEditError(errorMessages[0]);
      return;
    } else if (message) {
      setEditError(message);
      return;
    }
    if (data) {
      setUsers((prev) => {
        const newArr = replaceObjectById(id, editState, prev);
        return newArr;
      });
      setShow(false);
    }
  }
  return (
    <Modal
      setShow={setShow}
      className=" flex flex-col p-5 justify-center rounded-2xl gap-5 min-w-[400px]"
    >
      {toggleEdit ? (
        <UserEdit
          state={editState}
          setState={setEditState}
          error={editError}
          user={user}
          className="flex flex-col gap-10"
        />
      ) : (
        <UserDetails user={user} className="flex flex-col gap-10" />
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
            deleteUser(id);
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

export default UserModal;
