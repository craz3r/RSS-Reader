import $ from 'jquery';
import axios from 'axios';
import normalizeURL from 'normalize-url';
import changeView from './renders';
import checkValid from './validators';
import parseRss from './parsers';

export default () => {
  const state = {
    currentURL: '',
    rssStreams: [],
    loading: false,
    rssLinks: [],
    isValid: undefined,
  };

  const root = document.querySelector('#point');
  const field = root.querySelector('#inputRSS');
  const form = root.querySelector('#getRSS');

  const getRssFeed = () => {
    state.loading = true;

    axios.get(state.currentURL)
      .then((res) => {
        state.loading = false;
        const feed = parseRss(res.data);
        if (feed instanceof Error) {
          throw feed;
        } else {
          state.rssStreams = [feed, ...state.rssStreams];
          state.rssLinks = [state.currentURL, ...state.rssLinks];
          field.value = '';
        }
      })
      .catch((err) => {
        console.log(err);
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

  $('#modal').on('show.bs.modal', (e) => {
    const btn = $(e.relatedTarget);
    const title = btn.data('title');
    const description = btn.data('description');
    $('#modal').find('.modal-title').text(title);
    $('#modal').find('.modal-body').text(description);
  });

  changeView(root, state);
};
