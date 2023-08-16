import axios from 'axios';
import { auth } from './auth.helpers';
const remoteUrl = 'http://54.165.111.250:8000/api/';
const baseUrl = 'http://127.0.0.1:8000/api/';

async function getStudentCourses() {
  try {
    const res = await axios.get(`${remoteUrl}common/get-courses`, auth());
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
      `${remoteUrl}student/enroll-course`,
      { course_id },
      auth()
    );

    if (res.status == 200) {
      return res.data.submission;
    }
  } catch (error) {
    console.log(error);
  }
}

async function getEnrolledCourses() {
  try {
    const res = await axios.get(
      `${remoteUrl}student/get-enrolled-courses`,
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

async function addTaskSubmission({ due_date, task_id, file, file_name }) {
  try {
    const res = await axios.post(
      `${remoteUrl}student/add-submission`,
      { due_date, task_id, file, file_name },
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
async function getStudentProgressDetails(course_id) {
  try {
    const res = await axios.get(
      `${remoteUrl}student/getStudentProgressDetails/${course_id}`,
      auth()
    );
    if (res.data.status == 200) {
      const data = res.data;
      return { data };
    }
  } catch (error) {
    console.log(error);
    const {
      response: {
        data: { message, errors },
      },
    } = error;
    if (errors) {
      const errorMessages = Object.keys(errors).map((key) => {
        const firstError = errors[key][0];
        if (firstError) {
          return firstError;
        }
      });
      return { errorMessages };
    }
    return { message };
  }
}
export { getStudentCourses, getEnrolledCourses, enroll, addTaskSubmission,getStudentProgressDetails };
