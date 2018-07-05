export default (article) => {
  const { link, title, description } = article;
  return `
    <li class='list-group-item align-items-center d-flex justify-content-between'>
      <a href=${link}>${title}</a>
      <button class='btn btn-primary' data-toggle='modal' data-target='#modal' data-title='${title}' data-description='${description}'>More</button>
    </li>`;
};
