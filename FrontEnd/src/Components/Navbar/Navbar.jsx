import React, { useState, useEffect } from 'react';
import './Navbar.css';


const Navbar = ({ setShow }) => {
  const [btnState, setBtnState] = useState({
    1: false,
    2: false,
    3: false,
  });

  return (
    <nav className="nav-container flex justify-between items-center monster">
      <div className="logo gothic flex items-center">
        <span className="text-4xl cursor-pointer">SE-Learning</span>
      </div>

      <div className="right-section flex items-center justify-">
        <div className="monster user flex items-center cursor-pointer">
          {/* <div className="user-letter  flex items-center justify-center rounded-full bg-cyan-dark">
            <span className="text-white font-medium">A</span>
          </div> */}
          {/* <div className="user-name ">Alex</div> */}

        </div>
        <span
          onClick={() => {
            setShow(true);
          }}
          className="sign-in  font-semibold cursor-pointer"
        >
          Sign In
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
