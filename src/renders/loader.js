export default (root, loading) => {
  const container = root.querySelector('#output');
  const mountEl = container.querySelector('.loader');

  if (!mountEl && loading) {
    const loader = document.createElement('p');
    loader.classList.add('text-center');
    loader.innerHTML = 'Loading...';
    loader.classList.add('loader');
    container.prepend(loader);
  } else if (mountEl && !loading) {
    mountEl.remove();
  }
};
