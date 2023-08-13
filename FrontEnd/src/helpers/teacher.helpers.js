import axios from 'axios';
import { auth } from './auth.helpers';

const remoteUrl = 'http://54.165.111.250:8000/api/';
const baseUrl = 'http://127.0.0.1:8000/api/';
async function getTeacherCourses() {
  try {
    const res = await axios.get(`${remoteUrl}teacher/get-teacher-courses`, auth());
    const { data } = res;

    if (res.status === 200) {
      return data.courses;
    }
  } catch (error) {
    console.log(error);
  }
}

async function addSchedule({
  course_id,
  name,
  start_date,
  end_date,
}) {
  try {
    const res = await axios.post(
      `${remoteUrl}teacher/add-course-schedule"`,
      {
        course_id,
        name,
        start_date,
        end_date,
      },
      auth()
    );
    console.log(res);
    if (res.status === 200) {
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

export { getTeacherCourses,addSchedule};
