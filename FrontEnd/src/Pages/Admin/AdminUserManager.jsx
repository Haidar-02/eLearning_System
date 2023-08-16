import React, { useEffect, useState } from 'react';
import UserCard from '../../Components/Admin/UserCard';
import axios from 'axios';

import teacherIcon from'../../assets/icons/teacher.svg'
import parentIcon from'../../assets/icons/parent.svg'
import studentIcon from'../../assets/icons/student.svg'
import { getAllUsers } from '../../helpers/admin.helpers';
import { auth } from '../../helpers/auth.helpers';
import CreateUser from '../../Components/Admin/CreateUser';

const AdminUserManager = () => {
  const [users, setUsers] = useState([]); 
  const [show, setShow] = useState(false);
  const [typeNum, setTypeNum] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await getAllUsers();
      const filteredUsers = res.users.filter(user => user.user_type === typeNum);

      setUsers([...filteredUsers]);
    };

    fetchUsers();
  }, [typeNum]);

  const handleTeacherClick = () => {
    setTypeNum(2); 
  };

  const handleParentClick = () => {
    setTypeNum(3);
  };

  const handleStudentClick = () => {
    setTypeNum(4);
  };

  const handleAddUserClick=() => {
    setShow(true);
  };

  const handleDeleteUser = async (userId) => {
    try {

      await axios.delete(`http://127.0.0.1:8000/api/admin/deleteUser/${userId}`,auth());
      console.log('User deleted successfully');
  
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };


  const handleUserUpdated = (userId, updatedProperties) => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, ...updatedProperties } : user
    );
    setUsers(updatedUsers);
  };

  return (

    <div className='flex flex-col items-center grow'>
      <div onClick={handleAddUserClick}> Add New User </div>
      <div className='font-bold text-lg ' > {show && <div><CreateUser setShow={setShow} setState={setUsers}  /></div>}
      </div>
 

      <div className='flex flex-row justify-between w-[100%]' >
        <div className="w-24" onClick={handleTeacherClick}>
          <img className="" src={teacherIcon} alt="teacherIcon" />
        </div>
        <div className="w-24" onClick={handleParentClick}>
          <img src={parentIcon} alt="parentIcon" />
        </div>
        <div className="w-24" onClick={handleStudentClick}>
          <img src={studentIcon} alt="studentIcon" />
        </div>
       </div> 
        <div>
          <div className="user-list w-max">
            {users.map((user) => (
              <UserCard key={user.id} user={user} onDelete={handleDeleteUser} onUserUpdated={handleUserUpdated} />
            ))}
          </div>
        </div>
    </div>
  );
};

export default AdminUserManager;
