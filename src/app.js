import validator from 'validator';
import axios from 'axios';

const renderRssItem = (channel) => {
  const name = document.createElement('h2');
  name.innerHTML = channel.querySelector('title').textContent;
  const li = document.createElement('li');
  li.appendChild(name);
  console.log(li);
  return li;
};

const renderRss = (items) => {
  const ul = document.createElement('ul');
  items.forEach(item => ul.appendChild(renderRssItem(item)));
  console.log(ul);
  return ul;
};

export default () => {
  const field = document.querySelector('#inputRSS');
  const form = document.querySelector('#getRSS');
  const root = document.querySelector('#point');

  let state = {
    currentURL: '',
    rssStreams: [],
    requestStatus: null,
    rssLinks: [],
    isValid: false,
  };

  field.addEventListener('input', (e) => {
    state = { ...state, currentURL: e.target.value };
    if (!validator.isURL(e.target.value) || state.rssLinks.includes(e.target.value)) {
      field.classList.add('is-invalid');
      state = { ...state, isValid: false };
    } else {
      field.classList.remove('is-invalid');
      state = { ...state, isValid: true };
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!state.isValid) return false;

    axios.get(state.currentURL)
      .then((res) => {
        const parser = new DOMParser();
        const rss = parser.parseFromString(res.data, 'application/xml');
        state = { ...state, rssStreams: [...state.rssStreams, rss] };
        state = { ...state, rssLinks: [...state.rssLinks, state.currentURL] };
        field.value = '';
        if (state.rssStreams.length) {
          root.appendChild(renderRss(state.rssStreams));
        }
        console.log(state);
      })
      .catch(err => console.log(`error - ${err}`));
  });
};
