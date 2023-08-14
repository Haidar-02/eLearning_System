import { useEffect, useState } from "react";
import { getProjectGroups } from "../../../../helpers/common.helpers";
import ProjectGroupManager from "./ProjectGroupManager";
import Button from "../../../Common/Button";
import ProjectGroupDisplay from "./ProjectGroupDisplay";


const GroupProject = ({course_id}) => {

    const [groups,setGroups]=useState([]);
    const [showAddGroups,setAddGroups]=useState(false);



    return ( 
      <div>
        { !showAddGroups ? 
          <>
          <div className="flex items-center justify-between">
            <div className="page-header gothic color-cyan-dark text-2xl py-5">
                Project Groups
            </div>
            <div className="button-container flex items-center rounded-full p-3 h-[20px] ">
                <Button
                onClick={() => setAddGroups(true)}
                text="Add Groups"
                className="p-0 bg-cyan text-xl text-white"
                />
            </div>
          </div>
          <div className="group-container">
            <ProjectGroupDisplay groups={groups} setGroups={setGroups} course_id={course_id}/>
          </div>
          </>

        :
        <>
        <div className="flex items-center justify-between">
        <div className="page-header gothic color-cyan-dark text-2xl py-5">
            Project Groups
        </div>
        <div className="button-container flex items-center rounded-full p-3 h-[20px] ">
        <Button
            onClick={() => setAddGroups(false)}
            text="Back"
            className="p-0 bg-cyan text-xl text-white"
            />
        </div>
        </div>
        <div className="group-container">
          <ProjectGroupManager course_id={course_id}/>
        </div>
        </>

        }
      </div>
     );
}
 
export default GroupProject;