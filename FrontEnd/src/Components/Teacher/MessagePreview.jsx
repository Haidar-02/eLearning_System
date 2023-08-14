import React from "react";

const MessagePreview = () => {
  return (
    <div className="flex-col">
      <div className="px-5 py-3 bg-gray-600 text-white flex gap-5 rounded-lg justify-between items-center hover:bg-cyan-700 transition-all cursor-pointer">
        <div>
          Name <span className="text-sm font-semibold mb-2">(Email)</span>
        </div>
        <div className="bg-green-500 p-2 rounded-full text-xs">New message</div>
      </div>
    </div>
  );
};

export default MessagePreview;
