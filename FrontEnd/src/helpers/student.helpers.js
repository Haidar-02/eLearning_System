import axios from 'axios';
import { auth } from './auth.helpers';
const remoteUrl = 'http://54.165.111.250:8000/api/';
const baseUrl = 'http://127.0.0.1:8000/api/';

async function getStudentCourses() {
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
async function enroll(course_id) {
  try {
    const res = await axios.post(
      `${baseUrl}student/enroll-course`,
      { course_id },
      auth()
    );
    console.log(res);

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
}

async function getEnrolledCourses() {
  try {
    const res = await axios.get(
      `${baseUrl}student/get-enrolled-courses`,
      auth()
    );
    const { data } = res;
    if (res.status === 200) {
      return data.courses;
    }
  } catch (error) {
    console.log(error);
  }
}

export { getStudentCourses, getEnrolledCourses, enroll };
