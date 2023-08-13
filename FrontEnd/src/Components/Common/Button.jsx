import React from 'react';

const Button = ({ text, className, onClick }) => {
  return (
    <span
      onClick={onClick}
      className={` text-xs font-semibold cursor-pointer p-2 rounded-3xl bg-cyan-dark w-fit ${className}`}
    >
      {text}
    </span>
  );
};

export default Button;
