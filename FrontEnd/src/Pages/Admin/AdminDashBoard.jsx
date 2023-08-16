import React, { useState } from 'react';

import gradesIcon from '../../assets/icons/ChartSquareBarOutline.svg';
import dashIcon from '../../assets/icons/dashboard.svg';
import classesIcon from '../../assets/icons/UserGroupOutline.svg';
import clipBoardIcon from '../../assets/icons/ClipboardListOutline.svg';

import SideBar from '../../Components/DashBoard/SideBar';
import DashBoardButton from '../../Components/DashBoard/DashBoardButton';
import AdminCourseManager from './AdminCourseManager';
import AdminUserManager from './AdminUserManager';
import CreateBackupButton from '../../Components/Admin/CreateBackUpButton';
import Toggle from '../../Components/toggle';


import PieChart from '../../Components/DashBoard/PieChart';
import CourseProgressbar from '../../Components/DashBoard/CircularProgressBar';
import 'react-circular-progressbar/dist/styles.css';

const falseState = {
  dashboard: false,
  users: false,
  courses: false,
  assignments: false,
  messages: false,
};

const AdminDashBoard = () => {
  const [state, setState] = useState({
    dashboard: true,
    users: false,
    courses: false,
    assignments: false,
    messages: false,
  });

  const togglePage = (page) => {
    setState({ ...falseState, [page]: true });
  };

    const handleProgressBar = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/api/admin/getCourseEnrollmentsRate`,
          auth()
        );
      }catch (e) {
        console.log(e);
      }
    }
    handleProgressBar();



  const { dashboard, users, courses, assignments } = state;
  
  const completionPercentage =66;

  return (
    <div className="  dashBoardWrapper flex  h-full">
      <SideBar className="bg-cyan-dark">
        <div className="logo  flex items-center justify-center gothic">
          <span className="text-3xl cursor-pointer p-5 py-10 text-white">
            E-Learing
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
              togglePage('courses');
            }}
            icon={classesIcon}
            text="Courses"
          />
          <CreateBackupButton/>
          <Toggle />


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
          <CourseProgressbar  targetPercentage={completionPercentage} />
        </div>
      </div>}
        {users && <div className="h-[500px] p-10"><AdminUserManager/></div>}
        {courses && <AdminCourseManager />}
        {assignments && <div className="h-[500px] p-10">Assignments</div>}
        <div>
        </div>
      </div>

    </div>
  );
};

export default AdminDashBoard;
