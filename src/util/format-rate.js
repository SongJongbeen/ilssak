async function formatRate(value) {
    return isNaN(value) ? "N/A" : value.toFixed(2);
}

module.exports = formatRate;