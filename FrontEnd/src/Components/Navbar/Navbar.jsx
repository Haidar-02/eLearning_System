import React, { useState, useEffect } from 'react';
import './Navbar.css';
const Navbar = (props) => {
  const [btnState, setBtnState] = useState({
    1: false,
    2: false,
    3: false,
  });

  return (
    <nav className="nav-container flex justify-between items-center monster">
      <div className="logo gothic flex items-center">
        <span className="text-4xl cursor-pointer">Kidzo</span>
      </div>
      <div className="  mid-section flex justify-center items-center grow ">
        <div className="nav-button  hover:font-semibold text text-lg  transition-all cursor-pointer">
          Home
        </div>
        <div className="nav-button hover:font-semibold  text text-lg transition-all cursor-pointer">
          Textbook
        </div>
        <div className="nav-button  hover:font-semibold text text-lg  transition-all cursor-pointer">
          Games
        </div>
      </div>
      <div className="right-section flex items-center justify-">
        <div className="monster user flex items-center cursor-pointer">
          <div className="user-letter  flex items-center justify-center rounded-full ">
            <span className="">A</span>
          </div>
          <div className="user-name ">Alex</div>
        </div>
        <span className="sign-in  font-semibold cursor-pointer">Sign In</span>
      </div>
    </nav>
  );
};

export default Navbar;
