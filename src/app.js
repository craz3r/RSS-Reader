import $ from 'jquery';
import _ from 'lodash';
import axios from 'axios';
import normalizeURL from 'normalize-url';
import changeView from './renders';
import checkValid from './validators';
import parseRss from './parsers';

export default () => {
  const state = {
    currentURL: '',
    rssStreams: [],
    rssLinks: [],
    isValid: undefined,
    requestSuccess: null,
    requestSend: null,
    requestError: null,
  };

  const root = document.querySelector('#point');
  const field = root.querySelector('#inputRSS');
  const form = root.querySelector('#getRSS');

  const updateRssFeed = () => {
    const links = state.rssLinks.map(l => axios.get(l));
    const reqs = Promise.all(links);
    reqs.then((res) => {
      const updatedFeed = res.map(r => parseRss(r.data));
      updatedFeed.forEach(({ articles }, idx) => {
        articles.forEach((a) => {
          if (!_.find(state.rssStreams[idx].articles, a)) {
            state.rssStreams[idx].articles.push(a);
          }
        });
      });
    })
      .catch((err) => {
        console.log(`Update rss error ${err}`);
      });
    setTimeout(() => { updateRssFeed(); }, 5000);
  };

  const getRssFeed = () => {
    state.requestSend = true;
    state.requestSuccess = false;
    state.requestError = false;

    axios.get(state.currentURL)
      .then((res) => {
        const feed = parseRss(res.data);
        state.rssStreams = [feed, ...state.rssStreams];
        state.rssLinks = [state.currentURL, ...state.rssLinks];
        state.requestSend = false;
        state.requestSuccess = true;
      })
      .catch((err) => {
        console.log(err);
        state.requestSend = false;
        state.requestError = true;
        state.requestSuccess = false;
      });
    setTimeout(() => { updateRssFeed(); }, 5000);
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
