import React, { useState } from "react";

import Modal from "../../Common/Modal";
import Button from "../../Common/Button";
import SideBar from "../../DashBoard/SideBar";
import DashBoardButton from "../../DashBoard/DashBoardButton";
// import dashIcon from '../../assets/icons/dashboard.svg';
import bullhornSolid from "../../../assets/icons/bullhorn-solid.svg";
import discussionBoard from "../../../assets/icons/rectangle-list-regular.svg";
import homeIcon from "../../../assets/icons/house-solid.svg";
import group from "../../../assets/icons/people-group-solid.svg";
import feedbackIcon from '../../../assets/icons/feedback.svg';
import progressIcon from '../../../assets/icons/progress-report.svg';
import TeacherScheduleManager from './HomePage';
import GroupProject from "./GroupProject";
import StudentManager from "./Feedback";
import ProgressManager from "./Progress";
const falseState = {
  home_page: false,
  anouncements: false,
  group_project:false,
  feedback:false,
  progress:false,
  discussion_board: false,
};

const CourseModal = ({ course, courseModel, setCourseModel }) => {
  const [state, setState] = useState({
    home_page: true,
    group_project: false,
    feedback:false,
    progress:false,
    anouncements: false,
    discussion_board: false,
  });
  const togglePage = (page) => {
    setState({ ...falseState, [page]: true });
  };

  const { home_page, group_project , feedback,progress,anouncements, discussion_board } = state;
  return (
    <Modal
      setShow={setCourseModel}
      className="bg-grey-light fixed insta-border rounded-b-2xl w-[100vw] h-[100vh] transition-all text-black"
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
              SE-Learning
            </span>
          </div>
          <div className="button-container flex flex-col gap-5 min-w-[300px] monster font-medium text-white">
              <DashBoardButton
                icon={homeIcon}
                iconStyle="w-[24px]"
                textStyle="text-[18px]"
                text="Home Page"
                className={`${home_page && "bg-cyan-light color-cyan-dark"}`}
                onClick={() => {
                  togglePage("home_page");
                }}
              />
              <DashBoardButton
                icon={group}
                text="Group Project"
                className={`${group_project && "bg-cyan-light color-cyan-dark"}`}
                onClick={() => {
                  togglePage("group_project");
                }}
              />
            <DashBoardButton
                icon={feedbackIcon}
                text="Feedback"
                className={`${feedback && "bg-cyan-light color-cyan-dark"}`}
                onClick={() => {
                  togglePage("feedback");
                }}
              /> 
              <DashBoardButton
                icon={progressIcon}
                text="Progress"
                className={`${progress && "bg-cyan-light color-cyan-dark"}`}
                onClick={() => {
                  togglePage("progress");
                }}
              /> 
            <DashBoardButton
              onClick={() => {
                togglePage("anouncements");
              }}
              icon={bullhornSolid}
              className={`${anouncements && "bg-cyan-light color-cyan-dark"}`}

              text="Anouncements"
            />

            <DashBoardButton
              onClick={() => {
                togglePage("discussion_board");
              }}
              icon={discussionBoard}
              className={`${discussion_board && "bg-cyan-light color-cyan-dark"}`}

              text="Discussion Board"
            />
          </div>
        </SideBar>

        <div className="mainContent overflow-y-scroll flex flex-col px-14 py-10 flex-grow ">
          {/* PAGES GO HERE */}
          {home_page && <TeacherScheduleManager course={course} />}
          {group_project && <GroupProject course_id={course.id}/>}
          {feedback && <StudentManager course_id={course.id}/>}
          {progress && <ProgressManager course_id={course.id}/>}

          {anouncements && <span className="h-[500px] p-10">anouncements</span>}
          {discussion_board && (
            <span className="h-[500px] p-10">discussion board</span>
          )}
        </div>

      </div>
    </Modal>
  );
};

export default CourseModal;
