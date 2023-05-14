const getAverage = (arr) => {
  return arr.reduce((a, b) => a + b) / arr.length;
};

export default getAverage;
