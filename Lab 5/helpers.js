const isValidId = (id) => {
  id = id.trim();
  if (!id.length) return id;
  return id;
};

module.exports = {
  isValidId,
};