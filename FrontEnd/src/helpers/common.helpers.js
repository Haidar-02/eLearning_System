import axios from 'axios';
import { auth } from './auth.helpers';

const remoteUrl = 'http://54.165.111.250:8000/api/';
const baseUrl = 'http://127.0.0.1:8000/api/';

async function getAllCourses() {
  try {
    const res = await axios.get(`${baseUrl}common/get-courses`, auth());
    const { data } = res;

    if (res.status === 200) {
      return data.courses;
    }
  } catch (error) {
    console.log(error);
  }
}

async function sendMessage({ receiver_id, message }) {
  try {
    const res = await axios.post(
      `${baseUrl}common/send-message`,
      { receiver_id, message },
      auth()
    );
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
}

async function getMessages() {
  try {
    const res = await axios.get(`${baseUrl}common/get-messages`, auth());
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
}
async function getMessagesById(id) {
  try {
    const res = await axios.get(
      `${baseUrl}common/getMessagesById/${id}`,

      auth()
    );
    console.log(res.data);
    return res.data.messages;
  } catch (error) {
    console.log(error);
  }
}

async function search({ search, userType }) {
  try {
    const response = await axios.get(
      `${baseUrl}common/searchUser/${userType}/${search}`,
      auth()
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}

export { getAllCourses, sendMessage, search, getMessages, getMessagesById };
