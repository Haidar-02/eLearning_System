import React, { useState } from "react";

import dashIcon from "../../assets/icons/dashboard.svg";
import classesIcon from "../../assets/icons/UserGroupOutline.svg";
import messageIcon from "../../assets/icons/message-white.svg";
import logoutIcon from "../../assets/icons/right-from-bracket-solid-white.svg";

import SideBar from "../../Components/DashBoard/SideBar";
import DashBoardButton from "../../Components/DashBoard/DashBoardButton";
import TeacherCourseManager from "../../Components/Teacher/TeacherCourseManager";

const falseState = {
  dashboard: false,
  grades: false,
  classes: false,
  assignments: false,
  messages: false,
};

const TeacherDashBoard = () => {
  const [state, setState] = useState({
    dashboard: true,
    grades: false,
    classes: false,
    assignments: false,
    messages: false,
  });
  const [courseModel, setCourseModel] = useState(false);
  const togglePage = (page) => {
    setState({ ...falseState, [page]: true });
  };

  const { dashboard, grades, classes, assignments, messages } = state;

  return (
    <div className="dashBoardWrapper flex h-full">
      <SideBar className="bg-cyan-dark">
        <div className="logo  flex items-center justify-center gothic">
          <span className="text-3xl cursor-pointer p-5 py-10 text-white">
            Kidzo
          </span>
        </div>
        <div className="button-container flex flex-col gap-5 min-w-[300px] monster font-medium text-white">
          <div className="button-wrapper bg-cyan-light">
            <DashBoardButton
              icon={dashIcon}
              iconStyle="w-[24px] "
              textStyle="text-[18px] color-cyan-dark"
              text="Dashboard"
              className="font-semibold text-lg"
              onClick={() => {
                togglePage("dashboard");
              }}
            />
          </div>
          {/* <DashBoardButton
            onClick={() => {
              togglePage('grades');
            }}
            icon={gradesIcon}
            text="Users"
          /> */}
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
          />
          {/* <DashBoardButton icon={dashIcon} text="Dashboard" /> */}
        </div>
      </SideBar>

      <div className="mainContent flex flex-col p-14 h-fit flex-grow ">
        {/* PAGES GO HERE */}
        {dashboard && <span className="h-[500px] p-10">Analytics</span>}
        {/* {grades && <span className="h-[500px] p-10">Manage Users</span>} */}
        {classes && <TeacherCourseManager />}
        {messages && <MessagesList />}
      </div>
      {/* 
      <SideBar className={'right-0'}>
        <DashBoardButton icon={dashIcon} text="Dashboard" />
        <DashBoardButton icon={dashIcon} text="Dashboard" />
        <DashBoardButton icon={dashIcon} text="Dashboard" />
        <DashBoardButton icon={dashIcon} text="Dashboard" />
        <DashBoardButton icon={dashIcon} text="Dashboard" />
        <DashBoardButton icon={dashIcon} text="Dashboard" />
      </SideBar> */}
    </div>
  );
};

export default TeacherDashBoard;
