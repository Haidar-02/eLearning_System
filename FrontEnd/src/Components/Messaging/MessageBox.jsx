import React, { useEffect, useState } from 'react';
import CustomInput from '../Inputs/CustomInput';
import Search from '../Common/Search';
import {
  getMessages,
  sendMessage,
  getMessagesById,
} from '../../helpers/common.helpers';
import TextArea from '../Inputs/TextArea';
import send from '../../assets/icons/play-black.svg';
const MessageBox = ({user_type}) => {
  const [userMessage, setUserMessage] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedMessages, setSelectedMessages] = useState();

  const changeHandler = (e) => {
    const { value } = e.target;
    setUserMessage(value);
  };
  return (
    <div className="flex h-full gap-5">
      <Search
        setMessages={setSelectedMessages}
        setUser={setSelectedTeacher}
        userType={user_type}
      />

      <div className="messages flex flex-col gap-3 border   border-gray-300 w-[400px] h-[400px] p-4 rounded-2xl">
        <span className="  monster block uppercase tracking-wide text-gray-700 text-xs font-bold border-b pb-3">
          Chat
        </span>

        <div className="flex flex-col grow gap-5  overflow-auto">
          {selectedMessages && selectedMessages.length === 0 ? (
            <span className="text-sm text-gray-400 italic">Chat is empty</span>
          ) : (
            selectedMessages &&
            selectedMessages.map((message,index) => {
              const sent = message.is_sender.user_type === 2;
              return (
                <div
                  className={`flex flex-col gap-1  p-2 rounded-md ${
                    sent ? 'bg-green-200' : 'bg-gray-100'
                  }`} key={index}
                >
                  <div className={`flex gap-2 items-center`}>
                    <span className="text-black text-sm font-semibold">
                      {message.is_sender.name}
                    </span>
                    <span className=" text-gray-400 text-[10px]">
                      {message.created_at}
                    </span>
                  </div>
                  <span className="text-black text-sm">{message.message}</span>
                </div>
              );
            })
          )}
        </div>
        <div className="flex gap-3">
          <TextArea
            name={'sendMessage'}
            placeholder={'Enter a message'}
            className={'placeholder:text-sm mt-auto text-sm'}
            value={userMessage}
            rows={2}
            onChange={changeHandler}
          />
          <img
            src={send}
            alt=""
            className="w-[16px] ml-5 self-center"
            onClick={async () => {
              if (!userMessage.trim()) return;
              sendMessage({
                receiver_id: selectedTeacher,
                message: userMessage,
              });
              const messages = await getMessagesById(selectedTeacher);
              setSelectedMessages(messages);
              setUserMessage('');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
