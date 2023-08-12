import React, { useState } from 'react';
import SideBar from '../Components/DashBoard/SideBar';
import DashBoardButton from '../Components/DashBoard/DashBoardButton';
import gradesIcon from '../assets/icons/ChartSquareBarOutline.svg';
import dashIcon from '../assets/icons/dashboard.svg';
import classesIcon from '../assets/icons/UserGroupOutline.svg';
import clipBoardIcon from '../assets/icons/ClipboardListOutline.svg';
import { getAllCourses } from '../helpers/admin.helpers';

const falseState = {
  dashboard: false,
  grades: false,
  classes: false,
  assignments: false,
  messages: false,
};

const AdminDashBoard = () => {
  const [state, setState] = useState({
    dashboard: true,
    grades: false,
    classes: false,
    assignments: false,
    messages: false,
  });

  const [courses, SetCourses] = useState();
  const togglePage = (page) => {
    setState({ ...falseState, [page]: true });
  };

  const { dashboard, grades, classes, assignments } = state;

  return (
    <div className="dashBoardWrapper flex justify-between h-full">
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
                togglePage('dashboard');
              }}
            />
          </div>
          <DashBoardButton
            onClick={() => {
              togglePage('grades');
            }}
            icon={gradesIcon}
            text="Users"
          />
          <DashBoardButton
            onClick={async () => {
              togglePage('classes');
              const courses = getAllCourses();
            }}
            icon={classesIcon}
            text="Classes"
          />
          <DashBoardButton
            onClick={() => {
              togglePage('assignments');
            }}
            icon={clipBoardIcon}
            text="Assignments"
          />
          <DashBoardButton icon={dashIcon} text="Dashboard" />
          <DashBoardButton icon={dashIcon} text="Dashboard" />
        </div>
      </SideBar>

      <div className="mainContent flex flex-col ">
        {/* PAGES GO HERE */}
        {dashboard && <span className="h-[500px] p-10">Analytics</span>}
        {grades && <span className="h-[500px] p-10">Manage Users</span>}
        {classes && <span className="h-[500px] p-10">Classes</span>}
        {assignments && <span className="h-[500px] p-10">Assignments</span>}
      </div>

      <SideBar className={'right-0'}>
        <DashBoardButton icon={dashIcon} text="Dashboard" />
        <DashBoardButton icon={dashIcon} text="Dashboard" />
        <DashBoardButton icon={dashIcon} text="Dashboard" />
        <DashBoardButton icon={dashIcon} text="Dashboard" />
        <DashBoardButton icon={dashIcon} text="Dashboard" />
        <DashBoardButton icon={dashIcon} text="Dashboard" />
      </SideBar>
    </div>
  );
};

export default AdminDashBoard;
