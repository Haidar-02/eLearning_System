import React from "react";
import messageIcon from "../../assets/icons/message-white.svg";

const MessagePreview = () => {
  return (
    <div className="flex-col">
      <div className="px-5 py-3 bg-cyan-700 text-white flex gap-5 rounded-lg justify-between items-center hover:bg-gray-800 transition-all cursor-pointer hover:scale-95">
        <div>
          <img src={messageIcon} alt="" className="float-left w-5 mr-5" />
          Name Here{" "}
          <span className="text-sm font-semibold mb-2">~ Email Here</span>
        </div>
        <div className="bg-green-600 py-2 px-5 rounded-full text-xs uppercase">
          New message
        </div>
      </div>
    </div>
  );
};

export default MessagePreview;
