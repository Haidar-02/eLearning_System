import React from 'react';

const UserCard = ({ user }) => {
  const { name, email, user_type } = user;

  return (
    <div className="flex flex-col p-3 border gap-3">
      <div className="user-info">
        <span className="gothic font-semibold text-md">{name}</span>
        <span className="text-xs">{email}</span>
        <span className="text-xs">User Type: {user_type.name}</span>
      </div>
    </div>
  );
};

export default UserCard;
