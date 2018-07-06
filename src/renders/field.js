export default (root, { requestSuccess }) => {
  const field = root.querySelector('#inputRSS');
  if (requestSuccess) field.value = '';
};
