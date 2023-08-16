import React, { useEffect, useState } from "react";

import gradesIcon from "../../assets/icons/ChartSquareBarOutline.svg";
import dashIcon from "../../assets/icons/dashboard.svg";
import messageIcon from "../../assets/icons/message-white.svg";
import logoutIcon from "../../assets/icons/right-from-bracket-solid-white.svg";

import classesIcon from "../../assets/icons/UserGroupOutline.svg";
import clipBoardIcon from "../../assets/icons/ClipboardListOutline.svg";

import SideBar from "../../Components/DashBoard/SideBar";
import DashBoardButton from "../../Components/DashBoard/DashBoardButton";
import { getChildren } from "../../helpers/parent.helper";
import ChildCourses from "../../Components/Parent/ChildCourses";
import MessageBox from "../../Components/Messaging/MessageBox";
import ChildTasksGrades from "../../Components/Parent/ChildTasksGrades";
import ChildAttendances from "../../Components/Parent/ChildAttendances";

const falseState = {
  dashboard: false,
  grades: false,
  classes: false,
  assignments: false,
  messages: false,
};

const ParentDashBoard = () => {
  const [state, setState] = useState({
    dashboard: true,
    grades: false,
    classes: true,
    assignments: false,
    attendances: false,
    messages: false,
    teachers: false,
    conferences: false,
  });
  const [children, setChildren] = useState([]);

  useEffect(() => {
    const fetchChildren = async () => {
      const res = await getChildren();
      setChildren(res.children);
    };

    fetchChildren();
  }, []);
  const togglePage = (page) => {
    setState({ ...falseState, [page]: true });
  };

  const { classes, assignments, messages, conferences, attendances } = state;

  return (
    <div className="dashBoardWrapper flex h-full">
      <SideBar className="bg-cyan-dark">
        <div className="logo  flex items-center justify-center gothic">
          <span className="text-3xl cursor-pointer p-5 py-10 text-white">
            Kidzo
          </span>
        </div>
        <div className="button-container flex flex-col gap-5 min-w-[300px] monster font-medium text-white">
          <DashBoardButton
            onClick={async () => {
              togglePage("classes");
            }}
            icon={classesIcon}
            text="Classes and Teachers"
          />
          <DashBoardButton
            onClick={() => {
              togglePage("assignments");
            }}
            icon={gradesIcon}
            text="Tasks and Grades"
          />
          <DashBoardButton
            onClick={() => {
              togglePage("attendances");
            }}
            icon={clipBoardIcon}
            text="Attendances"
          />
          <DashBoardButton
            icon={messageIcon}
            text="Messages"
            onClick={() => {
              togglePage("messages");
            }}
          />
          <DashBoardButton
            icon={messageIcon}
            text="Conferences"
            onClick={() => {
              togglePage("conferences");
            }}
          />
          <DashBoardButton
            icon={logoutIcon}
            text="Logout"
            className={"hover:bg-red-600 transition-all"}
          />
        </div>
      </SideBar>

      <div className="mainContent flex px-2 py-10 h-fit justify-between ">
        {/* PAGES GO HERE */}
        {classes && <ChildCourses />}
        {attendances && <ChildAttendances />}
        {assignments && (
          <span className="h-[500px] p-10">
            <ChildTasksGrades />
          </span>
        )}
        {messages && (
          <span className="h-[500px] p-10">
            <MessageBox />
          </span>
        )}
        {conferences && <span className="h-[500px] p-10">Conferences</span>}
      </div>

      <SideBar className="right-0 p-3 bg-gray-200">
        <h2 className="text-center font-semibold mt-2">My Children</h2>
        {children &&
          children.map((child, index) => (
            <DashBoardButton
              key={index}
              icon={dashIcon}
              text={child.name}
              className="border-2 rounded-md hover:bg-gray-800 hover:text-white m-2 transition-all"
            />
          ))}{" "}
      </SideBar>
    </div>
  );
};

export default ParentDashBoard;
