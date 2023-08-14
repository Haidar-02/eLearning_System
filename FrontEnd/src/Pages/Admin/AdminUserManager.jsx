import React, { useEffect, useState } from 'react';
import UserCard from '../../Components/Admin/UserCard';

import teacherIcon from'../../assets/icons/teacher.svg'
import parentIcon from'../../assets/icons/parent.svg'
import studentIcon from'../../assets/icons/student.svg'
import { getAllUsers } from '../../helpers/admin.helpers';

const AdminUserManager = () => {
  const [users, setUsers] = useState([]); 
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await getAllUsers();
      console.log(res.users);

      setUsers([...res.users]);
      
    };

    fetchUsers();
  }, []);

  console.log(users);

  return (
<div>
  <div className="w-24 dark">
    <img className="" src={teacherIcon} alt="teacherIcon" />
  </div>
  <div className="w-24">
    <img src={parentIcon} alt="parentIcon" />
  </div>
  <div className="w-24">
    <img src={studentIcon} alt="studentIcon" />
  </div>

  <div>
        <h1>User List</h1>
        <div className="user-list">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminUserManager;
