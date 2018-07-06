export default (stream) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(stream, 'application/xml');

  if (doc.querySelector('parsererror')) {
    throw new Error('This is not xml document');
  }

  const articles = Array.from(doc.querySelectorAll('item')).map(a =>
    ({
      link: a.querySelector('link').textContent,
      title: a.querySelector('title').textContent,
      description: a.querySelector('description').textContent,
    }));

  return {
    title: doc.querySelector('title').textContent,
    description: doc.querySelector('description').textContent,
    articles,
  };
};
