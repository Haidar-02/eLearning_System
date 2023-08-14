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
export { toBase64, replaceObjectById };
