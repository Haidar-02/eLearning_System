import { useEffect, useState } from "react";
import { getProjectGroups } from "../../../../helpers/common.helpers";
import ProjectGroupManager from "./ProjectGroupManager";


const GroupProject = ({course_id}) => {

    const [groups,setGroups]=useState([]);
    useEffect(() => {
        const fetchProject = async () => {
          const res = await getProjectGroups(course_id);
          setGroups(res);
        };
        fetchProject()
      }, []);


    return ( 
      <div>
        <h1>Project Groups</h1>
        <ProjectGroupManager course_id={course_id}/>
      </div>
     );
}
 
export default GroupProject;