import React, { useState } from 'react';

const DashBoardButton = ({
  text,
  onClick,
  className,
  icon,
  iconStyle,
  textStyle,
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 h-100% py-4 w-100% cursor-pointer pl-10 ${className}`}
    >
      <div className="p-1">
        <img className={`w-[22px] ${iconStyle}`} src={icon} alt="" />
      </div>
      <span className={` ${textStyle}`}>{text}</span>
    </div>
  );
};

export default DashBoardButton;
