import React, { useState } from 'react';
import axios from 'axios';
import { auth } from '../../helpers/auth.helpers';


const CreateBackupButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreateBackup = async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');

      const response = await axios.get('http://127.0.0.1:8000/api/admin/createBackup',auth()); 
      console.log(response.data.message); 
    } catch (error) {
      if (error.response) {
        console.error('Error:', error.response.data.message);
        setErrorMessage(error.response.data.message);
      } else {
        console.error('Error:', error.message);
        setErrorMessage('An error occurred while creating the backup.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='pl-11'>
      <button onClick={handleCreateBackup} disabled={isLoading}>
        {isLoading ? 'Creating Backup...' : 'Create Backup'}
      </button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default CreateBackupButton;
