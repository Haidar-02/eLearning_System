function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
const replaceObjectById = (id, newObject, state) => {
  const updatedObjects = state.map((obj) => (obj.id === id ? newObject : obj));
  return updatedObjects;
};

const getUser = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user;
};

function getUnique(submissions) {
  const uniqueSubmissionsMap = new Map();
  submissions.forEach((submission) => {
    uniqueSubmissionsMap.set(submission.task_id, submission);
  });
  const uniqueSubmissions = Array.from(uniqueSubmissionsMap.values());
  return uniqueSubmissions;
}

function compareDates(taskA, taskB) {
  const dateA = new Date(taskA.submission_date);
  const dateB = new Date(taskB.submission_date);
  return dateA - dateB;
}

export { toBase64, replaceObjectById, getUser, getUnique, compareDates };
