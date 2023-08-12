import axios from 'axios';
const remoteUrl = 'http://54.165.111.250:8000/api/';
const baseUrl = 'http://127.0.0.1:8000/api/';
async function logIn({ email, password }) {
  try {
    const res = await axios.post(`${baseUrl}login`, {
      email,
      password,
    });
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

export { logIn };
