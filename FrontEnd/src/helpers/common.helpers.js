import axios from 'axios';
import { auth } from './auth.helpers';

const remoteUrl = 'http://54.165.111.250:8000/';
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

export { getAllCourses };
