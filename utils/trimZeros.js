const trimZeros = (arr) => {
  const start = arr.findIndex((e) => e > 0);
  // prettier-ignore
  const end = arr.length - arr.slice().reverse().findIndex((e) => e > 0);

  return arr.slice(start, end);
};

export default trimZeros;
