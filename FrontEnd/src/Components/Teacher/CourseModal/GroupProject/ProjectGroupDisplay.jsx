import { useEffect } from "react";
import { getProjectGroups } from "../../../../helpers/common.helpers";

const ProjectGroupDisplay = ({course_id,setGroups,groups}) => {

    useEffect(() => {
        const fetchProject = async () => {
          const res = await getProjectGroups(course_id);
        //   setGroups(res);
          console.log(res);
        };
        fetchProject()
      }, []);

    return ( 
        <h1>display</h1>
     );
}
 
export default ProjectGroupDisplay;