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
import { logOut } from "../../helpers/auth.helpers";
import ChildFeedbacks from "../../Components/Parent/ChildFeedbacks";
import { useNavigate } from "react-router-dom";

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
    feedbacks: false,
  });
  const navigate = useNavigate();

  const [children, setChildren] = useState([]);
  const [selectedChildId, setSelectedChildId] = useState(null);

  useEffect(() => {
    const fetchChildren = async () => {
      const res = await getChildren();
      setChildren(res.children);
      if (res.children.length > 0) {
        setSelectedChildId(res.children[0].id);
      }
    };

    fetchChildren();
  }, []);
  const togglePage = (page) => {
    setState({ ...falseState, [page]: true });
  };
  console.log(children);
  const { classes, assignments, messages, attendances, feedbacks } = state;

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
            className={`hover:bg-gray-400 transition-all`}
            onClick={async () => {
              togglePage("classes");
            }}
            icon={classesIcon}
            text="Classes and Teachers"
          />
          <DashBoardButton
            className={`hover:bg-gray-400 transition-all`}
            onClick={() => {
              togglePage("assignments");
            }}
            icon={gradesIcon}
            text="Tasks and Grades"
          />
          <DashBoardButton
            className={`hover:bg-gray-400 transition-all`}
            onClick={() => {
              togglePage("attendances");
            }}
            icon={clipBoardIcon}
            text="Attendances"
          />
          <DashBoardButton
            className={`hover:bg-gray-400 transition-all`}
            onClick={() => {
              togglePage("feedbacks");
            }}
            icon={clipBoardIcon}
            text="Feedbacks"
          />
          <DashBoardButton
            className={`hover:bg-gray-400 transition-all`}
            icon={messageIcon}
            text="Messages"
            onClick={() => {
              togglePage("messages");
            }}
          />
          <DashBoardButton
            icon={logoutIcon}
            text="Logout"
            className={"hover:bg-red-600 transition-all"}
            onClick={() => {
              logOut();
              localStorage.clear();
              navigate("/");
            }}
          />
        </div>
      </SideBar>

      <div className="mainContent flex px-2 py-10 h-fit justify-center items-center mx-5">
        {/* PAGES GO HERE */}
        {classes && <ChildCourses child_id={selectedChildId} />}
        {feedbacks && <ChildFeedbacks child_id={selectedChildId} />}
        {attendances && <ChildAttendances child_id={selectedChildId} />}
        {assignments && <ChildTasksGrades child_id={selectedChildId} />}
        {messages && <MessageBox />}
      </div>

      <SideBar className="right-0 p-3 bg-gray-200">
        <h2 className="text-center font-semibold mt-2">My Children</h2>
        {children &&
          children.map((child) => (
            <DashBoardButton
              key={child.id}
              icon={dashIcon}
              text={child.name}
              className={`border-2 rounded-md m-2 transition-all ${
                selectedChildId === child.id
                  ? "bg-green-500 text-white"
                  : "  hover:bg-gray-300"
              }`}
              onClick={() => {
                setSelectedChildId(child.id);
                if (selectedChildId !== child.id) {
                  togglePage(classes);
                }
              }}
            />
          ))}
      </SideBar>
    </div>
  );
};

export default ParentDashBoard;
