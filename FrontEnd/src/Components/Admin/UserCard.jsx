// import React from 'react';
// import recycleBinIcon from'../../assets/icons/recycleBin.svg'
// import editIcon from'../../assets/icons/edit.svg'


// const UserCard = ({ user }) => {
//   const { name, email, user_type } = user;

//   return (
//     <div className="flex flex-col p-3 m-3 border ">
//       <div className="user-info flex flex-row gap-1 justify-between" >
//         <div className="monster font-">{name}</div>
//         <span className="text-xs">{email}</span>
//         <span className="text-xs"> User Type: {user_type}</span>
//         <div className='flex'>
//             <div className='h-5 w-5'><img src={recycleBinIcon} alt="recyclebin" /></div>
//             <div className='h-5 w-5'><img src={editIcon} alt="editIcon" /></div>
//       </div>
//       </div>
//     </div>
//   );
// };

// export default UserCard;


import React from 'react';
import recycleBinIcon from '../../assets/icons/recycleBin.svg';
import editIcon from '../../assets/icons/edit.svg';

const UserCard = ({ user, onDelete }) => {
  const { id, name, email, user_type } = user;

  const handleDeleteClick = () => {
    onDelete(user.id);
  };

  return (
    <div className="flex flex-col p-3 m-3 border ">
      <div className="user-info flex flex-row gap-1 justify-between">
        <div className="monster font-">{name}</div>
        <span className="text-xs">{email}</span>
        <span className="text-xs"> User Type: {user_type}</span>
        <div className='flex'>
          <div className='h-5 w-5'><img src={recycleBinIcon} alt="recyclebin" onClick={handleDeleteClick} /></div>
          <div className='h-5 w-5'><img src={editIcon} alt="editIcon" /></div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
