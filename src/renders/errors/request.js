export default (root, requestError) => {
  const mountEl = root.querySelector('#getRSS');
  const error = mountEl.querySelector('#reqError');

  if (requestError && !error) {
    const msg = document.createElement('div');
    msg.innerHTML = 'Request Error';
    msg.className = 'alert alert-danger';
    msg.setAttribute('id', 'reqError');
    mountEl.prepend(msg);
  } else if (!requestError && error) {
    error.remove();
  }
};
