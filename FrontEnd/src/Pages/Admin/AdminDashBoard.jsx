import React, { useState } from 'react';

import gradesIcon from '../../assets/icons/ChartSquareBarOutline.svg';
import dashIcon from '../../assets/icons/dashboard.svg';
import classesIcon from '../../assets/icons/UserGroupOutline.svg';
import clipBoardIcon from '../../assets/icons/ClipboardListOutline.svg';

import SideBar from '../../Components/DashBoard/SideBar';
import DashBoardButton from '../../Components/DashBoard/DashBoardButton';
import AdminCourseManager from './AdminCourseManager';
import AdminUserManager from './AdminUserManager';



import PieChart from '../../Components/DashBoard/PieChart';
import CourseProgressbar from '../../Components/DashBoard/CircularProgressBar';
import 'react-circular-progressbar/dist/styles.css';

const falseState = {
  dashboard: false,
  users: false,
  classes: false,
  assignments: false,
  messages: false,
};

const AdminDashBoard = () => {
  const [state, setState] = useState({
    dashboard: true,
    users: false,
    classes: false,
    assignments: false,
    messages: false,
  });

  const togglePage = (page) => {
    setState({ ...falseState, [page]: true });
  };

  const { dashboard, users, classes, assignments } = state;
  
  const completionPercentage = 66;

  return (
    <div className="  dashBoardWrapper flex justify-between h-full">
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
              togglePage('users');
            }}
            icon={gradesIcon}
            text="Users"
          />
          <DashBoardButton
            onClick={async () => {
              togglePage('classes');
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

      <div className="mainContent flex flex-col   px-14 py-10 h-fit ">
      {dashboard &&
      <div className='flex flex-col items-center'>
        <div>
         <span className="h-[50px] p-10">
          <PieChart />
         </span>
        </div>
        <div className='w-32'>
          <CourseProgressbar targetPercentage={completionPercentage} />
        </div>
      </div>}
        {users && <span className="h-[500px] p-10"><AdminUserManager/></span>}
        {classes && <AdminCourseManager />}
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
