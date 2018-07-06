import { watch } from 'melanke-watchjs';
import renderChannel from './channel';
import renderLoader from './loader';
import renderFormState from './form';
import renderFieldState from './field';
import renderErrors from './errors';

export default (root, state) => {
  watch(state, 'requestSend', () => {
    renderFormState(root, state);
    renderLoader(root, state);
  });

  watch(state, 'requestSuccess', () => {
    renderFieldState(root, state);
  });

  watch(state, ['isValid', 'requestError'], () => {
    renderErrors(root, state);
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
