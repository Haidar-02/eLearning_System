import axios from 'axios';
import { auth } from './auth.helpers';

const remoteUrl = 'http://54.165.111.250:8000/api/';
const baseUrl = 'http://127.0.0.1:8000/api/';
async function getAllCourses() {
  try {
    const res = await axios.get(`${remoteUrl}common/get-courses`, auth());
    const { data } = res;

    if (res.status == 200) {
      return data.courses;
    }
  } catch (error) {
    console.log(error);
  }
}
// get-student-progress/10/8
async function getStudentProgress(course_id,student_id){
  try {
    const res = await axios.get(
      `${remoteUrl}common/get-student-progress/${student_id}/${course_id}`,
      auth()
    );
    if (res.status == 200) {
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
async function getCourseSchedules(course_id) {
  try {
    const res = await axios.get(
      `${remoteUrl}common/get-course-schedules/${course_id}`,
      auth()
    );
    const { data } = res;

    if (res.status == 200) {
      console.log(res);
      return data.schedules;
    }
  } catch (error) {
    console.log(error);
  }
}

async function getScheduleTasks(schedule_id) {
  try {
    const res = await axios.get(
      `${remoteUrl}common/get-schedule-tasks/${schedule_id}`,
      auth()
    );
    const { data } = res;

    if (res.status == 200) {
      return data.tasks;
    }
  } catch (error) {
    console.log(error);
  }
}

async function getScheduleMaterials(schedule_id) {
  try {
    const res = await axios.get(
      `${remoteUrl}common/get-schedule-materials/${schedule_id}`,
      auth()
    );
    const { data } = res;

    if (res.status == 200) {
      return data.materials;
    }
  } catch (error) {
    console.log(error);
  }
}
async function getCourseStudents(course_id) {
  try {
    const res = await axios.get(
      `${remoteUrl}common/get-course-students/${course_id}`,
      auth()
    );
    const { data } = res;

    if (res.status == 200) {
      return data.students;
    }
  } catch (error) {
    console.log(error);
  }
}

async function getScheduleSessions(schedule_id) {
  try {
    const res = await axios.get(
      `${remoteUrl}common/get-schedule-sessions/${schedule_id}`,
      auth()
    );
    const { data } = res;

    if (res.status == 200) {
      return data.sessions;
    }
  } catch (error) {
    console.log(error);
  }
}

async function getTaskSubmissions(task_id) {
  try {
    const res = await axios.get(
      `${remoteUrl}common/get-task-submissions/${task_id}`,
      auth()
    );
    const { data } = res;
    if (data.status == 200) {
      return data.submissions;
    }
  } catch (error) {
    console.log(error);
  }
}

async function getProjectGroups(course_id) {
  try {
    const res = await axios.get(
      `${remoteUrl}common/get-project-groups/${course_id}`,
      auth()
    );
    const { data } = res;

    if (res.status == 200) {
      return data.groups;
    }
  } catch (error) {
    console.log(error);
  }
}

async function getGroupMembers(project_id) {
  try {
    const res = await axios.get(
      `${remoteUrl}common/get-group-members/${project_id}`,
      auth()
    );
    const { data } = res;

    if (res.status == 200) {
      return data.members;
    }
  } catch (error) {
    console.log(error);
  }
}

async function getStudentFeedback(course_id, student_id) {
  try {
    const res = await axios.get(
      `${remoteUrl}common/get-student-feedback/${course_id}/${student_id}`,
      auth()
    );
    if (res.data.status == 200) {
      const data = res.data;
      return {data};
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

async function sendMessage(message, receiver_id) {
  try {
    const res = await axios.post(
      `${remoteUrl}common/send-message`,
      message,
      receiver_id,
      auth()
    );
    const { data } = res;

    if (res.status == 200) {
      return data.message;
    }
  } catch (error) {
    console.log(error);
  }
}

async function getMessages() {
  try {
    const res = await axios.get(`${remoteUrl}common/get-messages`, auth());
    const { data } = res;

    if (res.status == 200) {
      return data.messages;
    }
  } catch (error) {
    console.log(error);
  }
}

async function getCourseDiscussion(course_id) {
  try {
    const res = await axios.get(
      `${remoteUrl}common/get-course-discussion/${course_id}`,
      auth()
    );
    const { data } = res;

    if (res.status == 200) {
      return data.discussion;
    }
  } catch (error) {
    console.log(error);
  }
}
async function getMessagesById(id) {
  try {
    const res = await axios.get(
      `${remoteUrl}common/getMessagesById/${id}`,

      auth()
    );

    return res.data.messages;
  } catch (error) {
    console.log(error);
  }
}

async function addCourseDiscussion(message, course_id) {
  try {
    const res = await axios.post(
      `${remoteUrl}common/add-course-discussion`,
      message,
      course_id,
      auth()
    );
    const { data } = res;

    if (res.status == 200) {
      return data.discussion;
    }
  } catch (error) {
    console.log(error);
  }
}
async function search({ search, userType }) {
  try {
    const response = await axios.get(
      `${remoteUrl}common/searchUser/${userType}/${search}`,
      auth()
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function getCourseNotifications(course_id) {
  try {
    const res = await axios.get(
      `${remoteUrl}common/get-course-notifications/${course_id}`,
      auth()
    );
    const { data } = res;

    if (res.status == 200) {
      return data.notifications;
    }
  } catch (error) {
    console.log(error);
  }
}

async function getCourseTeacher(course_id) {
  try {
    const res = await axios.get(
      `${remoteUrl}common/get-course-teacher/${course_id}`,
      auth()
    );
    const { data } = res;

    if (res.status == 200) {
      return data.teacher;
    }
  } catch (error) {
    console.log(error);
  }
}
export {
  getAllCourses,
  getCourseSchedules,
  getScheduleTasks,
  getScheduleMaterials,
  getCourseStudents,
  getScheduleSessions,
  getTaskSubmissions,
  getGroupMembers,
  getProjectGroups,
  getStudentFeedback,
  sendMessage,
  getStudentProgress,
  search,
  getMessages,
  getMessagesById,
  getCourseDiscussion,
  addCourseDiscussion,
  getCourseNotifications,
  getCourseTeacher,
};
