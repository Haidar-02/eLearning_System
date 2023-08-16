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
    const { data, errorMessages, message } = await addProjectGroupMembers({course_id,selectedStudents});
    if (errorMessages) {
      setError(errorMessages[0]);
      return;
    } else if (message) {
      setError(message);
      return;
    }
    if (data) {
      setSelectedStudents([]);
      // setGroups((prev) => {
      //   return [data.students, ...prev];
      // });

    }
  }
    return ( 
        <div>
        <div className="flex justify-between">
        <div className='flex flex-grow justify-evenly'>
        <StudentList handleSelectStudent={handleSelectStudent} course_id={course_id} students={students} setStudents={setStudents}/>
        <GroupSelection selectedStudents={selectedStudents} handleSelectStudent={handleSelectStudent} />
        </div>

          <div className='flex items-start'>
          <Button
            text="Add Group"
            className=" text-[16px] bg-green text-white p-3 self-end"
            onClick={() => {
              handleSave();
            }}
          />
          </div>

        </div>
    </div>
     );
}
 
export default ProjectGroupManager;