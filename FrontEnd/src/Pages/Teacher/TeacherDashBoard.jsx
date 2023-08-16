import React, { useState } from "react";

import dashIcon from "../../assets/icons/dashboard.svg";
import classesIcon from "../../assets/icons/UserGroupOutline.svg";
import messageIcon from "../../assets/icons/message-white.svg";
import logoutIcon from "../../assets/icons/right-from-bracket-solid-white.svg";

import SideBar from "../../Components/DashBoard/SideBar";
import DashBoardButton from "../../Components/DashBoard/DashBoardButton";
import TeacherCourseManager from "../../Components/Teacher/TeacherCourseManager";
import MessageBox from "../../Components/Messaging/MessageBox";
import { logOut } from "../../helpers/auth.helpers";
import { useNavigate } from "react-router-dom";

const falseState = {
  grades: false,
  classes: false,
  messages: false,
};

const TeacherDashBoard = () => {
  const [state, setState] = useState({
    grades: true,
    classes: false,
    messages: false,
  });
  const navigate = useNavigate();
  const [courseModel, setCourseModel] = useState(false);
  const togglePage = (page) => {
    setState({ ...falseState, [page]: true });
  };

  const {  classes, messages } = state;

  return (
    <div className="dashBoardWrapper flex h-full">
      <SideBar className="bg-cyan-dark">
        <div className="logo  flex items-center justify-center gothic">
          <span className="text-3xl cursor-pointer p-5 py-10 text-white">
            SE-Learning
          </span>
        </div>
        <div className="button-container flex flex-col gap-5 min-w-[300px] monster font-medium text-white">
          <DashBoardButton
            onClick={async () => {
              togglePage("classes");
            }}
            icon={classesIcon}
            text="My Classes"
            className="hover:bg-blue-600 transition-all"
          />
          <DashBoardButton
            onClick={() => {
              togglePage("messages");
            }}
            icon={messageIcon}
            text="Messages"
            className="hover:bg-green-600 transition-all"
          />
          <DashBoardButton
            icon={logoutIcon}
            text="Logout"
            className={"hover:bg-red-600 transition-all"}
            onClick={()=>{
              logOut();
              localStorage.clear();
              navigate('/')
            }}
          />
          {/* <DashBoardButton icon={dashIcon} text="Dashboard" /> */}
        </div>
      </SideBar>

      <div className="mainContent flex flex-col p-14 h-fit flex-grow ">
        {classes && <TeacherCourseManager />}
        {messages && <MessageBox user_type={4}/>}
      </div>

    </div>
  );
};

export default TeacherDashBoard;
