import React, { useEffect, useState } from 'react';

const Modal = ({ children, className, setShow, backDropColor }) => {
  return (
    <div>
      <div
        onClick={() => {
          setShow(false);
        }}
        className="bg fixed top-0 z-10 left-0 w-[100vw] h-full  bg-opacity-20 backdrop-blur-sm drop-shadow-lg "
      ></div>
      <div
        className={` h-fit z-10 bg-grey-light transition-opacity absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
