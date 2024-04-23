async function sortObjectByValues(obj) {
    const entries = Object.entries(obj);
    entries.sort((a, b) => b[1] - a[1]);
    
    const sortedObj = {};
    for (const [key, value] of entries) {
        sortedObj[key] = value;
    }
    
    return sortedObj;
}

module.exports = sortObjectByValues;