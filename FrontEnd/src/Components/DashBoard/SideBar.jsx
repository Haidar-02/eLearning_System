import React from 'react';

const SideBar = ({ children, className }) => {
  return (
    <>
      <div className="class min-w-[300px] h-full"></div>
      <div
        className={`fixed min-w-[300px] h-full
 ${className}`}
      >
        {children}
      </div>
    </>
  );
};

export default SideBar;
