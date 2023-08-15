import { useEffect ,useState } from "react";
import { getProjectGroups } from "../../../../helpers/common.helpers";
import ProjectGroupCard from "./ProjectGroupCard";
const ProjectGroupDisplay = ({course_id,setGroups,groups}) => {

    useEffect(() => {
        const fetchProject = async () => {
          const res = await getProjectGroups(course_id);
          setGroups([...res]);
        };
        fetchProject()
      }, []);
    
    return ( 
        <div className="groups">
        { groups && groups.map((group)=>(
 
            <ProjectGroupCard group={group} groups={groups} setGroups={setGroups} key={group.id}/>
        ))}

        </div>
   

     );
}
 
export default ProjectGroupDisplay;