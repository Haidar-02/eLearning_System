import axios from 'axios';
const remoteUrl = 'http://54.165.111.250/';
const baseUrl = 'http://127.0.0.1:8000/api/';

const auth = () => {
  const { token } = JSON.parse(localStorage.getItem('user'));

  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

async function getAllUsers() {
  try {
    const { token } = localStorage.getItem('user');
    const res = await axios.get(`${baseUrl}`);
  } catch (error) {}
}

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

async function editCourse(
  id,
  { title, description, teacher_id, meet_link, enrollment_limit }
) {
  try {
    const res = await axios.put(
      `${baseUrl}admin/modifyCourse/${id}`,
      {
        title,
        description,
        teacher_id,
        meet_link,
        enrollment_limit,
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
async function addCourse({
  title,
  description,
  teacher_id,
  meet_link,
  enrollment_limit,
}) {
  try {
    const res = await axios.post(
      `${baseUrl}admin/addCourse`,
      {
        title,
        description,
        teacher_id,
        enrollment_limit,
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

async function deleteCourse(id) {
  try {
    await axios.delete(`${baseUrl}admin/deleteCourse/${id}`, auth());
  } catch (error) {
    console.log(error);
  }
}
export { getAllCourses, editCourse, deleteCourse, addCourse };
