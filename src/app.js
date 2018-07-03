import validator from 'validator';
import axios from 'axios';
import normalizeURL from 'normalize-url';
import Channel from './channel';

export default () => {
  let state = {
    currentURL: '',
    rssStreams: [],
    loading: false,
    rssLinks: [],
    isValid: false,
  };

  const root = document.querySelector('#point');
  const field = root.querySelector('#inputRSS');
  const form = root.querySelector('#getRSS');

  const renderRss = () => {
    const channels = state.rssStreams;
    const ul = document.createElement('ul');
    ul.classList.add('list-group');
    channels.forEach(ch => ul.appendChild(Channel(ch)));
    return ul;
  };

  const getRssFeed = () => {
    state = { ...state, rssLinks: [...state.rssLinks, state.currentURL] };
    state = { ...state, loading: true };

    const send = root.querySelector('#send');
    send.setAttribute('disabled', 'true');

    const loader = document.createElement('p');
    loader.classList.add('text-center');
    loader.innerHTML = 'Loading...';
    root.appendChild(loader);

    axios.get(state.currentURL)
      .then((res) => {
        state = { ...state, loading: false };
        send.removeAttribute('disabled');
        field.value = '';

        const parser = new DOMParser();
        const rss = parser.parseFromString(res.data, 'application/xml');
        state = { ...state, rssStreams: [...state.rssStreams, rss] };

        root.removeChild(loader);
        root.appendChild(renderRss());
      })
      .catch((err) => {
        console.log(`error - ${err}`);
        state = { ...state, loading: false };
        send.removeAttribute('disabled');
        root.removeChild(loader);
      });
  };

  field.addEventListener('input', (e) => {
    state = { ...state, currentURL: normalizeURL(e.target.value) };
    if (!validator.isURL(e.target.value) || state.rssLinks.includes(normalizeURL(e.target.value))) {
      field.classList.add('is-invalid');
      state = { ...state, isValid: false };
    } else {
      field.classList.remove('is-invalid');
      state = { ...state, isValid: true };
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    return state.isValid ? getRssFeed() : false;
  });
};
