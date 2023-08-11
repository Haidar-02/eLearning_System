import React, { useState } from 'react';
import SideBar from '../Components/DashBoard/SideBar';
import DashBoardButton from '../Components/DashBoard/DashBoardButton';
import grades from '../assets/icons/ChartSquareBarOutline.svg';
import dash from '../assets/icons/dashboard.svg';
import classes from '../assets/icons/UserGroupOutline.svg';
// import messages from '../assets/icons/';
const DashBoard = () => {
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
              icon={dash}
              iconStyle="w-[24px] "
              textStyle="text-[18px] color-cyan-dark"
              text="Dashboard"
              className="font-semibold text-lg"
            />
          </div>
          <DashBoardButton icon={grades} text="Grades" />
          <DashBoardButton icon={classes} text="Classes" />
          <DashBoardButton icon={dash} text="Dashboard" />
          <DashBoardButton icon={dash} text="Dashboard" />
          <DashBoardButton icon={dash} text="Dashboard" />
        </div>
      </SideBar>
      <div className="mainContent flex flex-col ">
        <span className="h-[500px] p-10">medium</span>
      </div>
      <SideBar className={'right-0'}>
        <DashBoardButton icon={dash} text="Dashboard" />
        <DashBoardButton icon={dash} text="Dashboard" />
        <DashBoardButton icon={dash} text="Dashboard" />
        <DashBoardButton icon={dash} text="Dashboard" />
        <DashBoardButton icon={dash} text="Dashboard" />
        <DashBoardButton icon={dash} text="Dashboard" />
      </SideBar>
    </div>
  );
};

export default DashBoard;
