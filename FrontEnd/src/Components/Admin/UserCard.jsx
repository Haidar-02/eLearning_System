// import React from 'react';
// import recycleBinIcon from '../../assets/icons/recycleBin.svg';
// import editIcon from '../../assets/icons/edit.svg';
// import EditForm from './EditForm';
// import { useState } from 'react';


// const UserCard = ({ user, onDelete, onUserUpdated}) => {
//   const { id, name, email, user_type } = user;
//   const [isEditOpen, setIsEditOpen] = useState(false);

//   const handleDeleteClick = () => {
//     onDelete(user.id);
//   };

//   const handleEditClick = () => {
//     setIsEditOpen(true);
//   };

//   const handleEditClose = () => {
//     setIsEditOpen(false);
//   };


//   return (
//     <div className="flex flex-col p-3 m-3 border ">
//       <div className="user-info flex flex-row gap-1 justify-between">
//         <div className="monster min-w-fit">{name}</div>
//         <span className="text-xs">{email}</span>
//         <span className="text-xs min-w-fit"> User Type: {user_type}</span>
//         <div className='flex'>
//           <div className='h-5 w-5'><img src={recycleBinIcon} alt="recyclebin" onClick={handleDeleteClick} /></div>
//           <div className='h-5 w-5'><img src={editIcon} alt="editIcon" onClick={handleEditClick} /></div>
//         </div>
//       </div>
//       {isEditOpen && (
//             <EditForm user={user} onClose={handleEditClose} onUserUpdated={onUserUpdated} />)}

//     </div>
//   );
// };

// export default UserCard;


import React, { useState } from 'react';
import recycleBinIcon from '../../assets/icons/recycleBin.svg';
import editIcon from '../../assets/icons/edit.svg';
import EditForm from './EditForm';

const UserCard = ({ user, onDelete, onUserUpdated }) => {
  const { id, name, email, user_type } = user;
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editState, setEditState] = useState({ name: user.name, email: user.email });

  const handleDeleteClick = () => {
    onDelete(id);
  };

  const handleEditClick = () => {
    setIsEditOpen(true);
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
  };

  return (
    <div className="flex flex-col p-3 m-3 border ">
      <div className="user-info flex flex-row gap-1 justify-between">
        <div className="monster min-w-fit">{name}</div>
        <span className="text-xs">{email}</span>
        <span className="text-xs min-w-fit"> User Type: {user_type}</span>
        <div className='flex'>
          <div className='h-5 w-5'>
            <img src={recycleBinIcon} alt="recyclebin" onClick={handleDeleteClick} />
          </div>
          <div className='h-5 w-5'>
            <img src={editIcon} alt="editIcon" onClick={handleEditClick} />
          </div>
        </div>
      </div>
      {isEditOpen && (
        <EditForm
          state={editState}
          setState={setEditState}
          onClose={handleEditClose}
          onUserUpdated={onUserUpdated}
          userId={id} 
        />
      )}
    </div>
  );
};

export default UserCard;
