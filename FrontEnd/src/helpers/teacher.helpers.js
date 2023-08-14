import axios from "axios";
import { auth } from "./auth.helpers";

const remoteUrl = "http://54.165.111.250:8000/api/";
const baseUrl = "http://127.0.0.1:8000/api/";

async function getTeacherCourses() {
  try {
    const res = await axios.get(
      `${remoteUrl}teacher/get-teacher-courses`,
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

async function addSchedule({ course_id, name, start_date, end_date }) {
  try {
    const res = await axios.post(
      `${remoteUrl}teacher/add-course-schedule`,
      {
        course_id,
        name,
        start_date,
        end_date,
      },
      auth()
    );
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

async function removeSchedule(schedule_id) {
  try {
    const res = await axios.delete(
      `${remoteUrl}teacher/remove-course-schedule/${schedule_id}`,
      auth()
    );
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

async function addTeacherCourse({ title, description, enrollment_limit }) {
  try {
    const res = await axios.post(
      `${remoteUrl}teacher/add-new-course`,
      {
        title,
        description,
        enrollment_limit,
      },
      auth()
    );

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

async function addScheduleMaterial({
  schedule_id,
  course_id,
  title,
  content,
  file,
  file_name,
}) {
  try {

    const res = await axios.post(
      `${remoteUrl}teacher/add-schedule-material`,
      {
        schedule_id,
        course_id,
        title,
        content,
        file,
        file_name,
      },
      auth()
    );

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

async function removeScheduleMaterial(material_id) {
  try {
    const res = await axios.delete(
      `${remoteUrl}teacher/remove-schedule-material/${material_id}`,
      auth()
    );

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

async function addScheduleTask({
  schedule_id,
  course_id,
  title,
  description,
  due_date,
  task_type,
}) {
  try {
    const res = await axios.post(
      `${remoteUrl}teacher/add-schedule-task`,
      {
        schedule_id,
        course_id,
        title,
        description,
        due_date,
        task_type,
      },
      auth()
    );

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

async function removeScheduleTask(task_id) {
  try {
    const res = await axios.delete(
      `${remoteUrl}teacher/remove-schedule-task/${task_id}`,
      auth()
    );

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

async function addScheduleSession({ schedule_id, course_id, date }) {
  try {
    const res = await axios.post(
      `${remoteUrl}teacher/add-schedule-session`,
      {
        schedule_id,
        course_id,
        date,
      },
      auth()
    );

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

async function removeScheduleSession(session_id) {
  try {
    const res = await axios.delete(
      `${remoteUrl}teacher/remove-schedule-session/${session_id}`,
      auth()
    );

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

async function addCourseProject({
  course_id,
  submition_date,
  due_date,
  file,
  status,
}) {
  try {
    const res = await axios.post(
      `${remoteUrl}teacher/add-course-project`,
      {
        course_id,
        submition_date,
        due_date,
        status,
        file,
      },
      auth()
    );

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

async function addProjectMembers({ project_id, student_id }) {
  try {
    const res = await axios.post(
      `${remoteUrl}teacher/add-project-member`,
      {
        project_id,
        student_id,
      },
      auth()
    );

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

async function modifyTaskGrade({ submission_id, grade }) {
  try {
    const res = await axios.put(
      `${remoteUrl}teacher/modify-task-grade`,
      {
        submission_id,
        student_id,
      },
      auth()
    );

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

async function modifyProjectGrade({ project_id, grade }) {
  try {
    const res = await axios.put(
      `${remoteUrl}teacher/modify-project-grade`,
      {
        project_id,
        grade,
      },
      auth()
    );

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

async function addFeedback({
  course_id,
  student_id,
  feedback,
  rating,
  comment,
}) {
  try {
    const res = await axios.post(
      `${remoteUrl}teacher/add-feedback`,
      {
        course_id,
        student_id,
        feedback,
        rating,
        comment,
      },
      auth()
    );

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

async function addNotification({ course_id, notification }) {
  try {
    const res = await axios.post(
      `${remoteUrl}teacher/add-notification`,
      {
        course_id,
        notification,
      },
      auth()
    );

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

export {
  getTeacherCourses,
  addTeacherCourse,
  addSchedule,
  removeSchedule,
  addScheduleMaterial,
  removeScheduleMaterial,
  addScheduleTask,
  removeScheduleTask,
  addScheduleSession,
  removeScheduleSession,
  addCourseProject,
  addProjectMembers,
  modifyTaskGrade,
  modifyProjectGrade,
  addFeedback,
  addNotification,
};
