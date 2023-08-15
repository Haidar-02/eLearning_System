
import axios from 'axios';
import { auth } from '../../helpers/auth.helpers';
import React from 'react';
import CustomInput from '../Inputs/CustomInput';

const EditForm = ({ user, onClose, onUserUpdated,userId }) => {
  const [editedUser, setEditedUser] = React.useState(userId);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };
console.log(editedUser);
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://127.0.0.1:8000/api/admin/modifyUser/${editedUser}`,
        editedUser,
        auth()
      );
      console.log('User updated successfully');
      const updatedProperties = {
        name: editedUser.name,
        email: editedUser.email
      };
      onUserUpdated(editedUser.id, updatedProperties);
      onClose();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <CustomInput
        label="Name"
        name="name"
        value={editedUser.name || (user && user.name) || ''}
        onChange={handleInputChange}
      />
      <CustomInput
        label="Email"
        name="email"
        value={editedUser.email || (user && user.email) || ''}
        onChange={handleInputChange}
      />
      <div className="flex gap-2">
        <button onClick={handleEditSubmit} className="btn-primary">
          Save
        </button>
        <button onClick={onClose} className="btn-secondary">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditForm;

