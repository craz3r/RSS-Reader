import renderArticle from './article';

export default (channel) => {
  const { title, description, articles } = channel;
  const li = document.createElement('li');
  li.classList.add('list-group-item');
  li.innerHTML = `
    <h2>${title}</h2>
    <p>${description}</h2>
    <ul class='list-group'>
      ${articles.map(a => renderArticle(a)).join('')}
    </ul>
  `;
  return li;
};
