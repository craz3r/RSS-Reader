export default (root, { requestSend }) => {
  const send = root.querySelector('#send');
  if (requestSend) {
    send.setAttribute('disabled', 'true');
  } else {
    send.removeAttribute('disabled');
  }
};
