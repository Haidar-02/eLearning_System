import React, { useState } from 'react';
import CustomInput from '../Inputs/CustomInput';
import Modal from '../Common/Modal';
import { addScheduleMaterial, addScheduleTask } from '../../helpers/Teacher.helpers';
import Button from '../Common/Button';
import TextArea from '../Inputs/TextArea';
const initialState = {
  title: '',
  content: '',
  file: '',
  file_name:''
};
const MaterialAdd = ({ setMaterialAdd, setMaterials,schedule_id,course_id}) => {
  const [state, setState] = useState(initialState);
  const [error, setError] = useState();
  function inputHandler(e) {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
}
  function fileHandler(e){
      let selectedImage=e.target.files[0];
      if (!selectedImage) {
          console.log('Please select an image.');
          return;
      }
      const reader = new FileReader();
      reader.onloadend = function () {
          const base64Image = reader.result.split(',')[1];
          setState((prev) => ({ ...prev, [e.target.name]: base64Image ,file_name:selectedImage.name}));

        };
      reader.readAsDataURL(selectedImage);
    
  }
  async function handleSave() {
    const { data, errorMessages, message } = await addScheduleMaterial({...state,course_id,schedule_id});
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
        return [data.tasks, prev];
      });

      setMaterialAdd(false);
    }
  }

  const { title, content, file } = state;
  return (
    <Modal
    setShow={setMaterialAdd}
    className=" flex flex-col p-5 justify-center rounded-2xl gap-5 min-w-[400px]"
    >
    <CustomInput
      label="Title"
      name="title"
      value={title}
      onChange={inputHandler}
    />
    <TextArea
      label="content"
      name="content"
      value={content}
      onChange={inputHandler}
    />
    <input type='file' name='file' onChange={fileHandler}/>

    <div className="error text-sm text-red-500 ">{error}</div>

    <div className="button-container flex gap-5 justify-end">
      <Button
        text="Create"
        className=" text-[16px] bg-green text-white p-3 self-end"
        onClick={() => {
          handleSave();
        }}
      />
      <Button
        text="cancel"
        onClick={() => {
          setMaterialAdd(false);
        }}
        className="text-[16px] bg-transparent text-cyan-600  p-3 self-end "
      />
    </div>
    </Modal>
  );
};

export default MaterialAdd;

