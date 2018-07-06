export default (root, isValid) => {
  const mountEl = root.querySelector('#inputRSS').parentElement;
  const field = mountEl.querySelector('#inputRSS');
  const message = mountEl.querySelector('.form-text');

  if (!isValid && !message) {
    const validError = document.createElement('small');
    validError.className = 'form-text text-danger';
    validError.innerHTML = 'This url is invalid';
    mountEl.appendChild(validError);
    field.classList.add('is-invalid');
  } else if (isValid && message) {
    field.classList.remove('is-invalid');
    message.remove();
  }
};
