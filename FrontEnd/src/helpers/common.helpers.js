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
      `${baseUrl}common/get-courses`,
      { receiver_id, message },
      auth()
    );
  } catch (error) {
    console.log(error);
  }
}

async function search(search, userType) {
  try {
    const response = await axios.get(`${base_url}user/search/${search}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export { getAllCourses, sendMessage };
