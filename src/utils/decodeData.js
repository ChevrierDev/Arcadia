const he = require('he');

// Function to decode data
function decodeData(items) {
  if (!Array.isArray(items)) {
    throw new Error('Input must be an array');
  }

  // Map through each item in the array
  return items.map(item => {
    if (typeof item !== 'object' || item === null) {
      throw new Error('Each item in the array must be a non-null object');
    }

    return Object.entries(item).reduce((acc, [key, value]) => {
      if (typeof key !== 'string') {
        throw new Error('Object keys must be strings');
      }

      acc[key] = typeof value === 'string' ? he.decode(value.replace(/_/g, ' ')) : value;
      return acc;
    }, {});
  });
}

module.exports = decodeData;
