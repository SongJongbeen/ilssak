async function sumValues(obj) {
    const result = {};
    for (const key in obj) {
      result[key] = Object.values(obj[key]).reduce((sum, current) => sum + current, 0);
    }
    return result;
}

module.exports = sumValues;