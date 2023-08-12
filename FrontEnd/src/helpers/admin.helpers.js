import axios from 'axios';
const remoteUrl = 'http://54.165.111.250/';
const baseUrl = 'http://54.165.111.250/';

async function getAllUsers() {
  try {
    const { token } = localStorage.getItem('user');
    const res = await axios.get(`${baseUrl}`);
  } catch (error) {}
}
async function getAllCourses() {
  try {
    const { token } = localStorage.getItem('user');
    const res = await axios.get(`${baseUrl}/student/get-courses`);
  } catch (error) {}
}
