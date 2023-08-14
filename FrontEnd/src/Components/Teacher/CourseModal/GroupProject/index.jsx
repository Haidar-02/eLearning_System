import { useEffect, useState } from "react";
import { getProjectGroups } from "../../../../helpers/common.helpers";
import ProjectGroupManager from "./ProjectGroupManager";


const GroupProject = ({course_id,project,setProject}) => {

    const [students,setStudents]=useState();
    const [selectedStudents,setSelectedStudents]=useState([]);
    useEffect(() => {
        const fetchProject = async () => {
          const res = await getProjectGroups(course_id);
          setProject(res);
        };
        fetchProject()
      }, []);


    const handleSelectStudent = (student) => {
      // Check if the student is already selected
      if (!selectedStudents.some(s => s.id === student.id)) {
        setSelectedStudents([...selectedStudents, student]);
      } else{
        let newSelectStudents=selectedStudents.filter((i)=>i.id!=student.id);
        setSelectedStudents([...newSelectStudents]);
      }
    };
    console.log(selectedStudents);
    return ( 
      <div>
        <h1>Project Groups</h1>
        <ProjectGroupManager handleSelectStudent={handleSelectStudent} course_id={course_id} selectedStudents={selectedStudents}/>
      </div>
     );
}
 
export default GroupProject;