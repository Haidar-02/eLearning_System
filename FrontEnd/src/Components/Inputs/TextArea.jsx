import React from 'react';

const TextArea = ({
  name,
  label,
  value,
  onChange,
  rows = 5,
  cols = 30,
  className,
  placeholder,
}) => {
  return (
    <div className="input-container flex flex-col gap-2 font-normal">
      <label className=" monster block uppercase tracking-wide text-gray-700 text-xs font-bold">
        {label}
      </label>
      <textarea
        name={name}
        value={value}
        rows={rows}
        cols={cols}
        className={` shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline 
        } ${className}`}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextArea;
