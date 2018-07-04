export default (article) => {
  const link = article.querySelector('link').textContent;
  const title = article.querySelector('title').textContent;
  return `<li class='list-group-item'><a href=${link}>${title}</a></li>`;
};
