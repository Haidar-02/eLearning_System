import React, { useState } from 'react';

// import instaLogo from '../assets/images/Instagram_logo.svg';
// import { logIn } from '../helpers/auth.helpers';
import { useNavigate } from 'react-router-dom';
import CustomInput from '../Inputs/CustomInput';

const initialState = {
  email: '',
  password: '',
};

const SignIn = () => {
  const [inputState, setInputState] = useState(initialState);
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();
  console.log(errors);

  function onChange(e) {
    const { value, name } = e.target;
    setInputState((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSignIn() {
    // const { data, message, errorMessages } = await logIn(inputState);
    if (errorMessages) {
      setErrors(errorMessages[0]);
      return;
    } else if (message) {
      setErrors(message);
      return;
    }
    if (data) {
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/dashBoard');
    }
  }

  const { email, password } = inputState;
  return (
    <div className="page-wrapper h-full flex flex-col justify-center items-center">
      <div className="signIn-container flex flex-col items-center gap-5 insta-border  h-fit p-10">
        <div className="form-container flex flex-col gap-5">
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
            className={'w-[300px]'}
          />
        </div>
        <div
          //   onClick={() => handleSignIn()}
          className="sign-in bg-insta-blue mt-5 p-2 rounded text-center text-white w-full"
        >
          Sign In
        </div>
        <div className="error font-normal text-red-700 text-sm">{errors}</div>
      </div>
    </div>
  );
};

export default SignIn;
