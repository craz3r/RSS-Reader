import { watch } from 'melanke-watchjs';
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

    const mountEl = document.querySelector('#output');
    const ul = document.createElement('ul');
    ul.classList.add('list-group');

    rssStreams.forEach(ch => ul.appendChild(renderChannel(ch)));

    mountEl.innerHTML = '';
    mountEl.appendChild(ul);
  });
};
