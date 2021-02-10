export const sortingCompareFunction = (field, isAsc) => (a, b) => ((a[field] < b[field] ? 1 : -1) * isAsc ? 1 : -1);

export const filteringCompareFunction = (search) => (item) => Object.keys(item)
  .find((key) => item[key].toLowerCase()
    .split(' ')
    .find((word) => word.startsWith(search.toLowerCase())));

export const onScroll = (callback) => (eventObject) => {
  const element = eventObject.target;
  const percentsBeforeBottom = (100 * element.scrollTop) / (element.scrollHeight - element.offsetHeight);
  if (percentsBeforeBottom > 90) {
    callback();
  }
};
