const uuidRegex = new RegExp(
  '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$'
);

const isUUID = (str) => {
  return uuidRegex.test(str);
};

export default isUUID;
