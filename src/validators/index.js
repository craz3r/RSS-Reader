import validator from 'validator';

export default (current, { currentURL, rssLinks }) => {
  if (!current.length) return false;
  return validator.isURL(current) && !rssLinks.includes(currentURL);
};

