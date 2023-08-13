import { useEffect, useState } from "react";
import { getScheduleMaterials,getScheduleTasks } from "../../helpers/common.helpers";
import Button from "../Common/Button";
const ScheduleContent = ({schedule_id,setScheduleContent}) => {
    const [materials,setMaterials]=useState()
    const [tasks,setTasks]=useState();
    // const [showTask,setShowTask]=useState(false);
    // const [showMaterial,setShowMaterial]=useState(false);

    useEffect(() => {
        const fetchMaterials = async () => {
          const res = await getScheduleMaterials(schedule_id);
        //   setSchedules(res);
          console.log(res);
        };
    
        fetchMaterials();
      }, []);
      useEffect(() => {
        const fetchTasks = async () => {
          const res = await getScheduleTasks(schedule_id);
        //   setSchedules(res);
          console.log(res);
        };
    
        fetchTasks();
      }, []);
    return ( 
        <div>
            {/* {show ? 
            <Schedule setShow={setShow} setSchedules={setSchedules} course_id={course.id}/> 
            :
            ( */}
                <>
                <div className="flex justify-between items-center">
                    <div className="page-header gothic color-cyan-dark text-2xl py-5">
                        Schedule Content
                    </div>
                    <div className="button-container flex justify-center items-center rounded-full p-3 w-[20px] h-[20px] bg-cyan-dark">
                        {/* <Button
                        onClick={() => setShow(true)}
                        text="+"
                        className="p-0 bg-transparent text-xl text-white"
                        /> */}
                        <Button
                        onClick={() => setScheduleContent({id:null,show:false})}
                        text="Back"
                        className="p-0 bg-transparent text-xl text-white"
                        />
                    </div>
                </div>
                {/* {
                schedules &&
                schedules.map((schedule, index) => (
                    <ScheduleCard key={index} schedule={schedule} setSchedules={setSchedules}/>
                ))
                } */}
            </>

            {/* )} */}
        </div>
    );
}
 
export default ScheduleContent;