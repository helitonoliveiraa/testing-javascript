const keyValueToString = item => {
  if (typeof item[1] === 'object' && !Array.isArray(item[1]))
    throw new Error('Invalid type');

  return item.join('=');
};

module.exports.queryString = obj =>
  Object.entries(obj).map(keyValueToString).join('&');

module.exports.parse = qs =>
  Object.fromEntries(
    qs.split('&').map(item => {
      let [key, value] = item.split('=');

      if (value.indexOf(',') > -1) {
        value = value.split(',');
      }

      return [key, value];
    }),
  );
