import renderArticle from './article';

export default (channel) => {
  const textTitle = channel.querySelector('title').textContent;
  const descriptionText = channel.querySelector('description').textContent;
  const articles = channel.querySelectorAll('item');
  const li = document.createElement('li');
  li.classList.add('list-group-item');
  li.innerHTML = `
    <h2>${textTitle}</h2>
    <p>${descriptionText}</h2>
    <ul class='list-group'>
      ${Array.from(articles).map(a => renderArticle(a)).join('')}
    </ul>
  `;
  return li;
};
