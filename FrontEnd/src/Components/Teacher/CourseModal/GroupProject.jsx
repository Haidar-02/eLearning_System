import { useEffect } from "react";
import { getProjectGroups } from "../../../helpers/common.helpers";

const GroupProject = ({course_id,project,setProject}) => {

    useEffect(() => {
        const fetchProject = async () => {
          const res = await getProjectGroups(course_id);
          setProject(res);
        };
        fetchProject()
      }, []);
      console.log(project);

    return ( 
        <div className="project-container">
            {project && <h1>project</h1>}
        </div>
     );
}
 
export default GroupProject;