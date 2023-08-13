import React from 'react';

const Button = ({ text, className, onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      className={` text-xs font-semibold cursor-pointer p-2 rounded-3xl bg-cyan-dark w-fit ${className} ${
        disabled && 'opacity-50 cursor-not-allowed'
      } `}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
