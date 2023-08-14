import React from "react";
import Modal from "./Modal";
import userIcon from "../../assets/icons/user.svg";
import CustomInput from "../Inputs/CustomInput";

const ChatModal = ({ isOpen, onClose }) => {
  return (
    <Modal setShow={isOpen} className="w-screen h-screen bg-transparent">
      <div onClick={onClose}></div>
      <div className="fixed bg-white p-4 shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-5/6 rounded-md flex-col justify-between items-center">
        <div className="bg-cyan-700 text-white px-5 py-2 rounded-full flex justify-between items-center fixed w-11/12">
          <div className="w-fit flex ">
            <img src={userIcon} alt="" className="float-left mr-3" />
            <p>Name here</p>
          </div>

          <button
            onClick={onClose}
            className=" py-1 px-2 text-white rounded-full hover:bg-red-700 transition"
          >
            Close
          </button>
        </div>
        <div className="overflow-auto mt-14 w-full flex-col justify-start h-3/4">
          <div className="bg-gray-500 m-3 py-2 px-4 rounded-full w-fit text-white">
            Reciever Message
          </div>
          <div className="bg-green-500 m-3 py-2 px-4 rounded-full w-fit text-white self-end">
            Sender Message
          </div>
        </div>
        <div className="gap-5 w-full mt-3 p-2 relative ">
          <CustomInput
            type="text"
            name="message"
            className="rounded-full pr-20 shadow-xl"
            placeholder="enter your message here"
          />
          <button className="absolute right-0 top-4 bg-blue-500 text-white px-3 py-1 rounded-full h-9 w-20 hover:bg-gray-800 transition-all">
            Send
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ChatModal;
