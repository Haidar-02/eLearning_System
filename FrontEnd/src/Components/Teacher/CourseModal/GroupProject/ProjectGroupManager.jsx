import StudentList from './StudentList';
import GroupSelection from './GroupSelection';

const ProjectGroupManager = ({handleSelectStudent,selectedStudents,course_id}) => {
    return ( 
        <div>
        <h1>Project Group Management</h1>
        <div className="flex justify-around">
          <StudentList handleSelectStudent={handleSelectStudent} course_id={course_id}/>
          <GroupSelection selectedStudents={selectedStudents} />
        </div>
    </div>
     );
}
 
export default ProjectGroupManager;