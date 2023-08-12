import React, { useState } from 'react';

// import instaLogo from '../assets/images/Instagram_logo.svg';
import { logIn } from '../../helpers/auth.helpers';
import { useNavigate } from 'react-router-dom';
import CustomInput from '../Inputs/CustomInput';

const initialState = {
  email: '',
  password: '',
};

const SignInForm = ({ setShow }) => {
  const [inputState, setInputState] = useState(initialState);
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();
  console.log(errors);

  function onChange(e) {
    const { value, name } = e.target;
    setInputState((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSignIn() {
    const { data, message, errorMessages } = await logIn(inputState);
    if (errorMessages) {
      setErrors(errorMessages[0]);
      return;
    } else if (message) {
      setErrors(message);
      return;
    }
    if (data) {
      localStorage.setItem('user', JSON.stringify(data));

      navigate('/adminDash');
    }
  }

  const { email, password } = inputState;
  return (
    <div className="signIn-container text-white  text-lg   flex flex-col items-center gap-5 insta-border  h-fit  z-10 rounded-2xl  bg-grey-light transition-opacity  absolute top-1/2  left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="form-header gothic bg-cyan-dark flex p-6 w-full rounded-t-2xl ">
        Sign In
      </div>
      <div className="form-container flex flex-col gap-5 p-6 pb-0 ">
        <CustomInput
          label="Email"
          name="email"
          type="text"
          onChange={onChange}
          value={email}
          className={'w-[300px]'}
        />
        <CustomInput
          label="password"
          name="password"
          type="password"
          onChange={onChange}
          value={password}
          className={'w-[300px]  '}
        />
      </div>
      <div className="error font-normal text-red-700 text-sm">{errors}</div>
      <div className=" monster flex  gap-3 w-full px-5 pb-5">
        <div
          onClick={() => handleSignIn()}
          className="sign-in bg-insta-blue p-2 rounded text-center text-white  bg-cyan-dark  w-full cursor-pointer"
        >
          Sign In
        </div>
        <div
          onClick={() => setShow(false)}
          className=" sign-in color-cyan-medium p-2 rounded text-center w-full cursor-pointer"
        >
          Cancel
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
