const toQueryString = (searchParams) => {
  if (Object.keys(searchParams).length === 0) return '';

  const arr = [];
  Object.entries(searchParams).map(([key, value]) => {
    arr.push(`${key}=${value}`);
  });

  return '?' + arr.join('&');
};

export default toQueryString;
