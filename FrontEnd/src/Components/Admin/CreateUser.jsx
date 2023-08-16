import React, { useEffect, useState } from 'react';
import CustomInput from '../Inputs/CustomInput';
import Modal from '../Common/Modal';
import Button from '../Common/Button';
import { createUser } from '../../helpers/admin.helpers';

const initialState = {
    name :"",
    email:"",
    password:"",
    user_type :""
};

const CreateUser = ({ setShow, setUsers }) => {

  const [state, setState] = useState(initialState);
  const [error, setError] = useState();
  console.log(setShow);

  function textInputHandler(e) {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  }
    console.log(state);
  async function handleSave() {
    const { data, errorMessages, message } = await createUser(state);
    if (errorMessages) {
      setError(errorMessages[0]);
      return;
    } else if (message) {
      setError(message);
      return;
    }
    if (data) {
      console.log(data);
      setUsers((prev) => {
        return [data.user, ...prev];
      });
      setShow(false);
    }
  }

  const { name, email, password, user_type } = state;

  return (
    <Modal
      setShow={setShow}
      className=" dark:bg-gray-700 flex flex-col p-5 justify-center rounded-2xl gap-5 min-w-[400px]"
    >
      <CustomInput
        label="Name"
        name="name"
        value={name}
        onChange={textInputHandler}
      />
    <CustomInput
        label="E-mail"
        name="email"
        value={email}
        onChange={textInputHandler}
      />
      <CustomInput
        label="Password"
        name="password"
        value={password}
        onChange={textInputHandler}
      />
      <CustomInput
        label="UserType"
        name="user_type"
        value={user_type}
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
            console.log("hello")
          }}
          className="text-[16px] bg-transparent text-cyan-600  p-3 self-end "
        />
      </div>
    </Modal>
  );
};

export default CreateUser;
