const toPercentage = (n, decimals = 0) => {
  return (n * 100).toFixed(decimals) + '%';
};

export default toPercentage;
