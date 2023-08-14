import React from "react";
import MessagePreview from "./MessagePreview";
import mailIcon from "../../assets/icons/mail-icon.svg";

const MessagesList = () => {
  return (
    <div className="flex-col align-middle">
      <h1 className="border-b border-gray-300 w-100% font-semibold mb-8">
        <img src={mailIcon} alt="" className="float-left w-5 mr-5" />
        My Messages
      </h1>

      {/* Map messages here */}
      <MessagePreview />
    </div>
  );
};

export default MessagesList;
