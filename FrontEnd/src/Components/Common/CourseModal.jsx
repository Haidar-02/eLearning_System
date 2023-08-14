import React, { useState } from "react";

import Modal from "../Common/Modal";
import Button from "./Button";
import SideBar from "../DashBoard/SideBar";
import DashBoardButton from "../DashBoard/DashBoardButton";
// import dashIcon from '../../assets/icons/dashboard.svg';
import bullhornSolid from "../../assets/icons/bullhorn-solid.svg";
import messageIcon from "../../assets/icons/message-regular.svg";
import discussionBoard from "../../assets/icons/rectangle-list-regular.svg";
import homeIcon from "../../assets/icons/house-solid.svg";
import TeacherScheduleManager from '../Teacher/TeacherScheduleManager';
const falseState = {
  home_page: false,
  anouncements: false,
  messages: false,
  discussion_board: false,
};

const CourseModal = ({ course, courseModel, setCourseModel }) => {
  const [state, setState] = useState({
    home_page: true,
    anouncements: false,
    messages: false,
    discussion_board: false,
  });
  const togglePage = (page) => {
    setState({ ...falseState, [page]: true });
  };

  const { home_page, anouncements, messages, discussion_board } = state;

  return (
    <Modal
      setShow={setCourseModel}
      className="fixed insta-border rounded-b-2xl w-[100vw] h-[100vh] ml-[100px] text-black"
    >
      <div className="dashBoardWrapper flex h-full">
        <SideBar className="bg-cyan-dark">
          <div className="logo  flex items-center justify-center gothic">
            <Button
              text="X"
              className="font-semibold text-lg text-[18px] bg-cyan-light"
              onClick={() => {
                setCourseModel(false);
              }}
            />
            <span className="text-3xl cursor-pointer p-5 py-10 text-white">
              Kidzo
            </span>
          </div>
          <div className="button-container flex flex-col gap-5 min-w-[300px] monster font-medium text-white">
            <div className="button-wrapper bg-cyan-light">
              <DashBoardButton
                icon={homeIcon}
                iconStyle="w-[24px] "
                textStyle="text-[18px] color-cyan-dark"
                text="Home Page"
                className="font-semibold text-lg"
                onClick={() => {
                  togglePage("home_page");
                }}
              />
            </div>
            <DashBoardButton
              onClick={() => {
                togglePage("anouncements");
              }}
              icon={bullhornSolid}
              text="Anouncements"
            />
            <DashBoardButton
              onClick={async () => {
                togglePage("messages");
              }}
              icon={messageIcon}
              text="Messages"
            />
            <DashBoardButton
              onClick={() => {
                togglePage("discussion_board");
              }}
              icon={discussionBoard}
              text="Discussion Board"
            />
          </div>
        </SideBar>

        <div className="mainContent flex flex-col px-14 py-10 flex-grow">
          {/* PAGES GO HERE */}
          {home_page && <TeacherScheduleManager course={course} />}
          {anouncements && <span className="h-[500px] p-10">anouncements</span>}
          {messages && <span className="h-[500px] p-10">messages</span>}

          {discussion_board && (
            <span className="h-[500px] p-10">discussion board</span>
          )}
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
    </Modal>
  );
};

export default CourseModal;
