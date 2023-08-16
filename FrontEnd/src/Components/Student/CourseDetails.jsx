import React, { useEffect, useState } from 'react';
import arrowLeft from '../../assets/icons/arrow-left.svg';
import {
  getCourseSchedules,
  getScheduleMaterials,
  getScheduleTasks,
} from '../../helpers/common.helpers';
import MaterialCard from '../Teacher/CourseModal/HomePage/Schedule/ScheduleContent/MaterialCard';
import TaskCard from '../Teacher/CourseModal/HomePage/Schedule/ScheduleContent/TaskCard';
import Modal from '../Common/Modal';
import Button from '../Common/Button';
import StudentCourseSchedual from './StudentCourseSchedule';
import SideBar from '../DashBoard/SideBar';
import StudentMaterialCard from './StudentMaterialCard';

const CourseDetails = ({ course, setShowDetails }) => {
  const [schedules, setSchedules] = useState();
  const [selected, setSelected] = useState();
  const [material, setMaterial] = useState({ materials: '', tasks: '' });

  useEffect(() => {
    const fetchSchedule = async () => {
      const s = await getCourseSchedules(course.id);
      setSchedules(s);
    };

    fetchSchedule();
  }, []);

  return (
    <Modal
      setShow={setShowDetails}
      className={'w-full overflow-scroll h-full p-5  bg-white'}
    >
      <img
        className="p-[12px] w-30"
        src={arrowLeft}
        onClick={() => setShowDetails((prev) => !prev)}
      />
      <div className="flex p-[12px] gap-10">
        <SideBar>
          <div className="flex flex-col rounded-2xl border border-gray-500">
            <span className="pl-[12px] font-bold text-xl bg-cyan-dark rounded-t-2xl text-white p-3 ">
              Schedules
            </span>
            {schedules &&
              schedules.map((s, index) => (
                <StudentCourseSchedual
                  key={index}
                  className="border-0 m-0 cursor-pointer"
                  schedule={s}
                  setMaterial={setMaterial}
                />
              ))}
          </div>
        </SideBar>
        <div className="flex flex-col grow  rounded-t-2xl gap-5 ">
          <div className="courseMaterial   flex flex-col text-center min-h-[300px] border border-gray-500 rounded-2xl  ">
            <div className="materials  rounded-t-2xl ">
              <div className="bg-cyan-dark rounded-t-2xl  p-3  ">
                <span className="pl-[12px] font-bold text-white  text-xl    ">
                  Material
                </span>
              </div>

              {material.materials && (
                <div className="flex flex-col">
                  {material.materials.map((m, index) => (
                    <StudentMaterialCard
                      key={index}
                      material={m}
                      className={''}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col   min-h-[300px] border-2 rounded-2xl ">
            <div className="bg-cyan-dark rounded-t-2xl text-center  p-3  ">
              <span className="pl-[12px] font-bold text-white   text-xl  ">
                Tasks
              </span>
            </div>
            {material.tasks && (
              <div className="flex flex-col">
                {material.tasks.map((m, index) => (
                  <StudentMaterialCard
                    key={index}
                    task={m}
                    setMaterial={setMaterial}
                    className="border-b-2"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CourseDetails;
