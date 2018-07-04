export default (streams) => {
  const parser = new DOMParser();
  return streams.map(rss => parser.parseFromString(rss, 'application/xml'));
};
