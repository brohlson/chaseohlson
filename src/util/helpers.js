const helpers = {
  chunkArray: (arr, size) => {
    let results = [];

    while (arr.length) {
      results.push(arr.splice(0, size));
    }

    return results;
  },
};

export default helpers;
