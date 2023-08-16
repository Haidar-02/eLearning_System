import axios from "axios";
import { auth } from "./auth.helpers";
const remoteUrl = "http://54.165.111.250:8000/api/parent";
const baseUrl = "http://127.0.0.1:8000/api/parent";

export const getChildren = async () => {
  try {
    const response = await axios.get(`${remoteUrl}/getChildren`, auth());
    return response.data;
  } catch (error) {
    console.log(`Failed to fetch child: ${error.message}`);
  }
};

export const getChildCourses = async (child_id) => {
  try {
    const response = await axios.get(
      `${remoteUrl}/getChildCourses/${child_id}`,
      auth()
    );
    return response.data;
  } catch (error) {
    console.log(`Failed to fetch child: ${error.message}`);
  }
};

export const getChildTeachers = async (child_id) => {
  try {
    const response = await axios.get(
      `${remoteUrl}/getChildTeachers/${child_id}`,
      auth()
    );
    return response.data;
  } catch (error) {
    console.log(`Failed to fetch child teachers: ${error.message}`);
  }
};

export const getChildAttendance = async (child_id) => {
  try {
    const response = await axios.get(
      `${remoteUrl}/getChildAttendance/${child_id}`,
      auth()
    );
    return response.data;
  } catch (error) {
    console.log(`Failed to fetch child attendance: ${error.message}`);
  }
};

export const getChildFeedbacks = async (child_id) => {
  try {
    const response = await axios.get(
      `${remoteUrl}/getChildFeedback/${child_id}`,
      auth()
    );
    return response.data;
  } catch (error) {
    console.log(`Failed to fetch child feedback: ${error.message}`);
  }
};
// export const getChildGrades = async (child_id) => {
//   try {
//     const response = await axios.get(
//       `${baseUrl}/getChildGrades/${child_id}`,
//       auth()
//     );
//     return response.data;
//   } catch (error) {
//     console.log(`Failed to fetch child feedback: ${error.message}`);
//   }
// };
// export const getChildTasks = async (child_id) => {
//   try {
//     const response = await axios.get(
//       `${baseUrl}/getChildTasks/${child_id}`,
//       auth()
//     );
//     return response.data;
//   } catch (error) {
//     console.log(`Failed to fetch child tasks: ${error.message}`);
//   }
// };

export const getChildTasksAndGrades = async (child_id) => {
  try {
    const response = await axios.get(
      `${remoteUrl}/getChildTasksAndGrades/${child_id}`,
      auth()
    );
    return response.data;
  } catch (error) {
    console.log(`Failed to fetch child tasks: ${error.message}`);
  }
};
export const getParentConferences = async () => {
  try {
    const response = await axios.get(
      `${remoteUrl}/getParentConferences`,
      auth()
    );
    return response.data;
  } catch (error) {
    console.log(`Failed to fetch parent conferences: ${error.message}`);
  }
};

export const getTeacherConferenceSlots = async (teacherId) => {
  try {
    const response = await axios.get(
      `${remoteUrl}/getTeacherConferenceSlots/${teacherId}`,
      auth()
    );
    return response.data;
  } catch (error) {
    console.log(`Failed to fetch teacher conference slots: ${error.message}`);
  }
};

export const scheduleConferenceWithTeacher = async (teacherScheduleId) => {
  try {
    const response = await axios.post(
      `${remoteUrl}/scheduleConferenceWithTeacher/${teacherScheduleId}`,
      auth()
    );
    return response.data;
  } catch (error) {
    console.log(`Failed to schedule conference with teacher: ${error.message}`);
  }
};

export default {
  getChildren,
  getChildCourses,
  getChildTeachers,
  getChildAttendance,
  getChildFeedbacks,
  // getChildGrades,
  // getChildTasks,
  getParentConferences,
  getTeacherConferenceSlots,
  getChildTasksAndGrades,
};
