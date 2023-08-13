import axios from 'axios';
import { auth } from './auth.helpers';

const remoteUrl = 'http://54.165.111.250:8000/api/';
const baseUrl = 'http://127.0.0.1:8000/api/';
async function getAllCourses() {
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
async function getCourseSchedules(course_id) {
  try {
    const res = await axios.get(`${remoteUrl}common/get-course-schedules/${course_id}`, auth());
    const { data } = res;

    if (res.status === 200) {
      return data.schedules;
    }
  } catch (error) {
    console.log(error);
  }
}

async function getScheduleTasks(schedule_id) {
  try {
    const res = await axios.get(`${remoteUrl}common/get-schedule-tasks/${schedule_id}`, auth());
    const { data } = res;

    if (res.status === 200) {
      return data.courses;
    }
  } catch (error) {
    console.log(error);
  }
}

async function getScheduleAssignments() {
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

export { getAllCourses,getCourseSchedules};
