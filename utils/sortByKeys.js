// cf. https://stackoverflow.com/questions/5467129/
const sortByKeys = (object) => {
  return Object.keys(object)
    .sort()
    .reduce((obj, key) => {
      obj[key] = object[key];
      return obj;
    }, {});
};

export default sortByKeys;
