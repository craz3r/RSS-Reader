export default (root, isValid) => {
  const field = root.querySelector('#inputRSS');
  if (!isValid) {
    field.classList.add('is-invalid');
  } else {
    field.classList.remove('is-invalid');
  }
};
