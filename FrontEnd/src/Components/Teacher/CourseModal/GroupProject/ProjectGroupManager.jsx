import StudentList from './StudentList';
import GroupSelection from './GroupSelection';
import { useState } from 'react';
import Button from '../../../Common/Button';
import { addProjectGroupMembers } from '../../../../helpers/Teacher.helpers';

const ProjectGroupManager = ({course_id}) => {
  const [students, setStudents] = useState([]);
  const [selectedStudents,setSelectedStudents]=useState([]);

  const handleSelectStudent = (student) => {
    // Check if the student is already selected
    if (!selectedStudents.some(s => s.id === student.id)) {
      setSelectedStudents([...selectedStudents, student]);
    } else{
      let newSelectStudents=selectedStudents.filter((i)=>i.id!=student.id);
      setSelectedStudents([...newSelectStudents]);
    }
  };

  async function handleSave() {
    console.log({course_id,selectedStudents});
    const { data, errorMessages, message } = await addProjectGroupMembers({course_id,selectedStudents});
    if (errorMessages) {
      setError(errorMessages[0]);
      return;
    } else if (message) {
      setError(message);
      return;
    }
    if (data) {
      console.log(data);
      setMaterials((prev) => {
        return [data.material, ...prev];
      });

      setMaterialAdd(false);
    }
  }
    return ( 
        <div>
        <h1>Project Group Management</h1>
        <div className="flex justify-around">
          <StudentList handleSelectStudent={handleSelectStudent} course_id={course_id} students={students} setStudents={setStudents}/>
          <GroupSelection selectedStudents={selectedStudents} />
          <Button
            text="Add selected to group"
            className=" text-[16px] bg-green text-white p-3 self-end"
            onClick={() => {
              handleSave();
            }}
          />
        </div>
    </div>
     );
}
 
export default ProjectGroupManager;