import axios from 'axios';
const remoteUrl = 'http://54.165.111.250/';
const baseUrl = 'http://127.0.0.1:8000/api/';

const auth = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});
async function getAllUsers() {
  try {
    const { token } = localStorage.getItem('user');
    const res = await axios.get(`${baseUrl}`);
  } catch (error) {}
}
async function getAllCourses() {
  try {
    const { token } = localStorage.getItem('user');
    const res = await axios.get(`${baseUrl}getAllCourses`, auth());
    const { data } = res;
    if (res.status === 200) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
}

export { getAllCourses };
