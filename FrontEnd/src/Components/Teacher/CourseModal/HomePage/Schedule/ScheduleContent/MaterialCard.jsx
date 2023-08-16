import React, { useState } from "react";
import Button from "../../../../../Common/Button";
import { removeScheduleMaterial } from "../../../../../../helpers/Teacher.helpers";

const MaterialCard = ({ material,setMaterials}) => {
  const {
    title,
    content,
    file_path
  } = material;
  
  const deleteMaterial = async () => {
    const res = await removeScheduleMaterial(material.id);
    setMaterials((prev)=>prev.filter(i => i.id !== material.id));
};


  return (
    <div className="flex flex-col p-3 border gap-3 rounded-md transition-colors bg-cyan-light m-5 hover:bg-slate-200">
      <div
        className="material-title"
      >
        <span className="text-md font-bold uppercase hover:underline">
          {title}
        </span>
      </div>
      <div className="content monster text-xs flex flex-col gap-5 cursor-default">
        <div className="description">
          <span className="font-semibold">Content: </span>
          {content}
        </div>
        <div className="enrollment-limit">
          <span className="font-semibold">File: </span>
          {file_path}
        </div>
      </div>
      <Button
                onClick={() => deleteMaterial()}
                text="Delete"
                className="p-0 bg-green text-xl text-white"
        />
    </div>
  );
};

export default MaterialCard;
