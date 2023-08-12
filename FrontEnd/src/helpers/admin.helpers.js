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

export { getAllCourses };
