import { useEffect, useState } from "react";
import { getScheduleMaterials,getScheduleTasks } from "../../../../../helpers/common.helpers";
import Button from "../../../../Common/Button";
import TaskAdd from "./ScheduleContent/TaskAdd";
import TaskCard from "./ScheduleContent/TaskCard";
import MaterialAdd from "./ScheduleContent/MaterialAdd";
import MaterialCard from "./ScheduleContent/MaterialCard";
import Submissions from "./ScheduleContent/Submissions/Submissions";
const ScheduleContent = ({schedule_id,course_id,setScheduleContent}) => {
    const [materials,setMaterials]=useState()
    const [tasks,setTasks]=useState();
    const [showTaskAdd,setTaskAdd]=useState(false);
    const [showMaterialAdd,setMaterialAdd]=useState(false);
    const [showSubmissions,setShowSubmissions]=useState({show:false,id:null});

    // const [showTask,setShowTask]=useState(false);
    // const [showMaterial,setShowMaterial]=useState(false);

    useEffect(() => {
        const fetchMaterials = async () => {
          const res = await getScheduleMaterials(schedule_id);
          setMaterials(res);
        };
    
        fetchMaterials();
      }, []);
      useEffect(() => {
        const fetchTasks = async () => {
          const res = await getScheduleTasks(schedule_id);
          setTasks(res);
        };
    
        fetchTasks();
      }, []);
    return ( 
      <>
      {showSubmissions.show ? 
        <Submissions task_id={showSubmissions.task_id} setShowSubmissions={setShowSubmissions}/>
      :
      (
      <div>
      {showTaskAdd && <TaskAdd setTaskAdd={setTaskAdd} setTasks={setTasks} course_id={course_id} schedule_id={schedule_id}/> }
      {showMaterialAdd && <MaterialAdd setMaterialAdd={setMaterialAdd} setMaterials={setMaterials} course_id={course_id} schedule_id={schedule_id}/> }

          <div className="flex  justify-between items-center">
              <div className="page-header gothic color-cyan-dark text-2xl py-5">
                  Schedule Content
              </div>
              <div className="button-container flex items-center rounded-full p-3 h-[20px] ">
                  <Button
                  onClick={() => setScheduleContent({id:null,show:false})}
                  text="Back"
                  className="p-0 bg-cyan text-xl text-white"
                  />
                  <Button
                  onClick={() => setTaskAdd(true)}
                  text="Add Task"
                  className="p-0 bg-cyan text-xl text-white"
                  />
                  <Button
                  onClick={() => setMaterialAdd(true)}
                  text="Add Material"
                  className="p-0 bg-cyan text-xl text-white"
                  />
              </div>
          </div>
          <div className="tasks">
            {
            tasks &&
            tasks.map((task, index) => (
                <TaskCard key={index} task={task} setTasks={setTasks} setShowSubmissions={setShowSubmissions}/>
            ))
            }
          </div>

          <div className="materials">
            {
            materials &&
            materials.map((material, index) => (
                <MaterialCard key={index} material={material} setMaterials={setMaterials}/>
            ))
            }
          </div>
        </div>
      )
      }
       </>

    );
}
 
export default ScheduleContent;