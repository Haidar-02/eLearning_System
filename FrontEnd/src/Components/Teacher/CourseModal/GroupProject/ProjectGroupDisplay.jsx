import { useEffect } from "react";
import { getProjectGroups } from "../../../../helpers/common.helpers";
import { removeGroup } from "../../../../helpers/Teacher.helpers";
import Button from "../../../Common/Button";
const ProjectGroupDisplay = ({course_id,setGroups,groups}) => {

    useEffect(() => {
        const fetchProject = async () => {
          const res = await getProjectGroups(course_id);
          setGroups([...res]);
        };
        fetchProject()
      }, []);
    
  const deleteGroup = async (group_id) => {
    const res = await removeGroup(group_id);
    if(res.status=='200'){
        setGroups((prev)=>prev.filter(i => i.id !== group_id));
    }
};
    return ( 
        <div className="groups">
        { groups && groups.map((group)=>(
            <div className="flex flex-col p-3 border gap-3 bg-cyan-light m-5" key={group.id}>
            
            <div className="content monster text-xs flex flex-col gap-2">
                <div className="submission-date">
                <span className="font-semibold underline text-black">Submission Date: </span>
                {group.submission_date}
                </div>
            </div>
            <div className="content monster text-xs flex flex-col gap-2">
                <div className="status">
                <span className="font-semibold underline">Status: </span>
                {group.status}
                </div>
            </div>
            <div className="content monster text-xs flex flex-col gap-2">
                <div className="file-path">
                <span className="font-semibold underline">File Path: </span>
                {group.file_path}
                </div>
            </div>
            <div className="content monster text-xs flex flex-col gap-2">
                <div className="members">
                <span className="font-semibold underline">Members: </span>
                {
                    group.members_info.map((member)=>(
                        <div key={member.id}>{member.name}</div>
                    ))
                }
                </div>
            </div>
            <Button
                onClick={() => deleteGroup(group.id)}
                text="Delete"
                className="p-0 bg-transparent text-xl text-black"
             />
            </div>
        ))
        }
        </div>
   

     );
}
 
export default ProjectGroupDisplay;