export default (root, loading) => {
  const el = root.querySelector('.loader');
  if (!el && loading) {
    const loader = document.createElement('p');
    loader.classList.add('text-center');
    loader.innerHTML = 'Loading...';
    loader.classList.add('loader');
    root.appendChild(loader);
  } else if (el && !loading) {
    el.remove();
  }
};
