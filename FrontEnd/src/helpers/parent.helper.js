import axios from "axios";
import { auth } from "./auth.helpers";
const remoteUrl = "http://54.165.111.250:8000/api/parent";
const baseUrl = "http://127.0.0.1:8000/api/parent";

export const getChild = async () => {
  try {
    const response = await axios.get(`${baseUrl}/getChildren`);
    return response.data;
  } catch (error) {
    console.log(`Failed to fetch child: ${error.message}`);
  }
};

export const getChildCourses = async () => {
  try {
    const response = await axios.get(`${baseUrl}/getChildCourses/${child_id}`);
    return response.data;
  } catch (error) {
    console.log(`Failed to fetch child: ${error.message}`);
  }
};

export const getChildTeachers = async () => {
  try {
    const response = await axios.get(`${baseUrl}/getChildTeachers/${child_id}`);
    return response.data;
  } catch (error) {
    console.log(`Failed to fetch child teachers: ${error.message}`);
  }
};

export const getChildAttendance = async () => {
  try {
    const response = await axios.get(
      `${baseUrl}/getChildAttendance/${child_id}`
    );
    return response.data;
  } catch (error) {
    console.log(`Failed to fetch child attendance: ${error.message}`);
  }
};

export const getChildFeedback = async () => {
  try {
    const response = await axios.get(`${baseUrl}/getChildFeedback/${child_id}`);
    return response.data;
  } catch (error) {
    console.log(`Failed to fetch child feedback: ${error.message}`);
  }
};
export const getChildGrades = async () => {
  try {
    const response = await axios.get(`${baseUrl}/getChildGrades/${child_id}`);
    return response.data;
  } catch (error) {
    console.log(`Failed to fetch child feedback: ${error.message}`);
  }
};

export const getChildTasks = async () => {
  try {
    const response = await axios.get(`${baseUrl}/getChildTasks/${child_id}`);
    return response.data;
  } catch (error) {
    console.log(`Failed to fetch child tasks: ${error.message}`);
  }
};

export const getParentConferences = async () => {
  try {
    const response = await axios.get(`${baseUrl}/getParentConferences`);
    return response.data;
  } catch (error) {
    console.log(`Failed to fetch parent conferences: ${error.message}`);
  }
};

export const getTeacherConferenceSlots = async (teacherId) => {
  try {
    const response = await axios.get(
      `${baseUrl}/getTeacherConferenceSlots/${teacherId}`
    );
    return response.data;
  } catch (error) {
    console.log(`Failed to fetch teacher conference slots: ${error.message}`);
  }
};

export const scheduleConferenceWithTeacher = async (teacherScheduleId) => {
  try {
    const response = await axios.post(
      `${baseUrl}/scheduleConferenceWithTeacher/${teacherScheduleId}`
    );
    return response.data;
  } catch (error) {
    console.log(`Failed to schedule conference with teacher: ${error.message}`);
  }
};
