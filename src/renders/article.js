export default (article) => {
  const { link, title } = article;
  return `<li class='list-group-item'><a href=${link}>${title}</a></li>`;
};
