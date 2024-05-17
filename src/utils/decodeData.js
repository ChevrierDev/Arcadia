const he = require('he');

// Function to decode data
function decodeData(items) {
  // Map through each item in the array
  return items.map(item => {
    return Object.entries(item).reduce((acc, [key, value]) => {
      acc[key] = typeof value === "string" ? he.decode(value.replace("_", " ")) : value;
      return acc;
    }, {}); 
  });
}


module.exports = decodeData;
