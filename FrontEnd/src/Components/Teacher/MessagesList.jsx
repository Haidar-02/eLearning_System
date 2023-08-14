import React, { useState } from "react";
import MessagePreview from "./MessagePreview";
import mailIcon from "../../assets/icons/mail-icon.svg";
import ChatModal from "../Common/ChatModal";

const MessagesList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="flex-col align-middle">
      <h1 className="border-b border-gray-300 w-100% font-semibold mb-8">
        <img src={mailIcon} alt="" className="float-left w-5 mr-5" />
        My Messages
      </h1>

      {/* Map messages here */}
      <div className="flex-col">
        <MessagePreview onClick={handleModalOpen} />
      </div>
      <ChatModal isOpen={isModalOpen} onClose={handleModalClose} />
    </div>
  );
};

export default MessagesList;
