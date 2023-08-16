import React, { useEffect, useState } from 'react';

import gradesIcon from '../../assets/icons/ChartSquareBarOutline.svg';
import dashIcon from '../../assets/icons/dashboard.svg';
import classesIcon from '../../assets/icons/UserGroupOutline.svg';
import clipBoardIcon from '../../assets/icons/ClipboardListOutline.svg';
import chat from '../../assets/icons/ChatOutline.svg';
import play from '../../assets/icons/noun-interactive-1171204 (1).svg';

import SideBar from '../../Components/DashBoard/SideBar';
import DashBoardButton from '../../Components/DashBoard/DashBoardButton';
import StudentCourseManager from '../../Components/Student/StudentCourseManager';
import MessageBox from '../../Components/Messaging/MessageBox';
import StudentProgress from '../../Components/Student/StudentProgress';
import Interactive from '../../Components/Student/Interactive';
const falseState = {
  dashboard: false,
  grades: false,
  classes: false,

  messages: false,
  interactive: false,
};

const StudentDashBoard = () => {
  const [state, setState] = useState({
    grades: false,
    classes: true,
    messages: false,
  });

  const togglePage = (page) => {
    setState({ ...falseState, [page]: true });
  };

  const { dashboard, grades, classes, assignments, messages, interactive } =
    state;

  return (
    <div className="dashBoardWrapper flex h-full">
      <SideBar className="bg-cyan-dark">
        <div className="logo  flex items-center justify-center gothic">
          <span className="text-3xl cursor-pointer p-5 py-10 text-white">
            SE-Learning
          </span>
        </div>
        <div className="button-container flex flex-col gap-5 min-w-[300px] monster font-medium text-white">
          <div className="button-wrapper bg-cyan-light">
            <DashBoardButton
              icon={dashIcon}
              iconStyle="w-[24px] "
              textStyle="text-[18px] color-cyan-dark"
              text="Dashboard"
              className="font-semibold text-lg cursor-default "
            />
          </div>
          <DashBoardButton
            onClick={async () => {
              togglePage('classes');
            }}
            icon={classesIcon}
            text="Classes"
          />

          <DashBoardButton
            onClick={() => {
              togglePage('grades');
            }}
            icon={gradesIcon}
            text="Grades"
          />

          <DashBoardButton
            onClick={() => {
              togglePage('messages');
            }}
            icon={chat}
            text="Messaging"
          />

          <DashBoardButton
            onClick={() => {
              togglePage('interactive');
            }}
            icon={play}
            text="Interactive"
            iconStyle={'w-[15px]'}
          />
        </div>
      </SideBar>

      <div className="mainContent flex flex-col grow h-full   px-14 py-10  ">
        {/* PAGES GO HERE */}
        {dashboard && <span className="h-[500px] p-10">Analytics</span>}
        {classes && <StudentCourseManager className="p-20" />}
        {grades && <StudentProgress />}
        {messages && <MessageBox user_type={2} />}
        {interactive && <Interactive />}
      </div>
    </div>
  );
};

export default StudentDashBoard;
