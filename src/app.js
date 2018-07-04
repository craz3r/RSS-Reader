import axios from 'axios';
import normalizeURL from 'normalize-url';
import changeView from './renders';
import checkValid from './validators';

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

  const getRssFeed = () => {
    state.rssLinks = [...state.rssLinks, state.currentURL];
    state.loading = true;

    axios.get(state.currentURL)
      .then((res) => {
        state.loading = false;
        field.value = '';
        state.rssStreams = [...state.rssStreams, res.data];
      })
      .catch((err) => {
        console.log(`error - ${err}`);
        state.loading = false;
      });
  };

  field.addEventListener('input', (e) => {
    if (e.target.value.length) {
      state.currentURL = normalizeURL(e.target.value);
      state.isValid = checkValid(e.target.value, state);
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (state.isValid) {
      getRssFeed();
    }
  });

  changeView(root, state);
};
