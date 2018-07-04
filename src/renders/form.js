export default (root, loading) => {
  const send = root.querySelector('#send');
  if (loading) {
    send.setAttribute('disabled', 'true');
  } else {
    send.removeAttribute('disabled');
  }
};
