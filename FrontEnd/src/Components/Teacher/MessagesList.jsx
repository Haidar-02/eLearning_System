import React from "react";
import MessagePreview from "./MessagePreview";

const MessagesList = () => {
  return (
    <div className="flex-col align-middle">
      <h1 className="border-b border-gray-300 w-100% font-semibold mb-8">
        Messages From
      </h1>
      <MessagePreview />
    </div>
  );
};

export default MessagesList;
