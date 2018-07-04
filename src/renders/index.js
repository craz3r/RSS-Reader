import { watch } from 'melanke-watchjs';
import parseRss from '../parsers';
import renderChannel from './channel';
import renderLoader from './loader';
import renderFormState from './form';
import renderFieldState from './field';

export default (root, state) => {
  watch(state, 'loading', () => {
    const { loading } = state;
    renderFormState(root, loading);
    renderLoader(root, loading);
  });

  watch(state, 'isValid', () => {
    const { isValid } = state;
    renderFieldState(root, isValid);
  });

  watch(state, 'rssStreams', () => {
    const { rssStreams } = state;
    const channels = parseRss(rssStreams);

    const mountEl = document.querySelector('#output');
    const ul = document.createElement('ul');
    ul.classList.add('list-group');

    channels.forEach(ch => ul.appendChild(renderChannel(ch)));

    if (!mountEl) {
      const container = document.createElement('div');
      container.setAttribute('id', 'output');
      container.appendChild(ul);
      root.appendChild(container);
    } else {
      mountEl.innerHTML = '';
      mountEl.appendChild(ul);
    }
  });
};
