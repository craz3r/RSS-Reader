import validator from 'validator';
import axios from 'axios';
import normalizeURL from 'normalize-url';
import renderChannel from './renders/channel';

export default () => {
  const state = {
    currentURL: '',
    rssStreams: [],
    loading: false,
    rssLinks: [],
    isValid: false,
  };

  const root = document.querySelector('#point');
  const field = root.querySelector('#inputRSS');
  const form = root.querySelector('#getRSS');

  const parseRss = () => {
    const parser = new DOMParser();
    return state.rssStreams.map(rss => parser.parseFromString(rss, 'application/xml'));
  };

  const renderRss = () => {
    const channels = parseRss();
    const ul = document.createElement('ul');
    ul.classList.add('list-group');
    channels.forEach(ch => ul.appendChild(renderChannel(ch)));
    return ul;
  };

  const getRssFeed = () => {
    state.rssLinks = [...state.rssLinks, state.currentURL];
    state.loading = true;

    const send = root.querySelector('#send');
    send.setAttribute('disabled', 'true');

    const loader = document.createElement('p');
    loader.classList.add('text-center');
    loader.innerHTML = 'Loading...';
    root.appendChild(loader);

    axios.get(state.currentURL)
      .then((res) => {
        state.loading = false;
        send.removeAttribute('disabled');
        field.value = '';

        state.rssStreams = [...state.rssStreams, res.data];

        root.removeChild(loader);
        root.appendChild(renderRss());
      })
      .catch((err) => {
        console.log(`error - ${err}`);
        state.loading = false;
        send.removeAttribute('disabled');
        root.removeChild(loader);
      });
  };

  field.addEventListener('input', (e) => {
    state.currentURL = normalizeURL(e.target.value);
    if (!validator.isURL(e.target.value) || state.rssLinks.includes(state.currentURL)) {
      field.classList.add('is-invalid');
      state.isValid = false;
    } else {
      field.classList.remove('is-invalid');
      state.isValid = true;
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    return state.isValid ? getRssFeed() : false;
  });
};
