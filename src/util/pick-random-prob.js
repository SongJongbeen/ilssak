async function pickRandomProb(data) {
    let total = 0;
    const cumulativeWeights = [];

    for (const key in data) {
        total += data[key];
        cumulativeWeights.push({ key, cumulativeWeight: total });
    }

    const random = Math.random() * total;

    for (let i = 0; i < cumulativeWeights.length; i++) {
        if (random < cumulativeWeights[i].cumulativeWeight) {
            selected = cumulativeWeights[i].key;
            return selected;
        }
    }
}

module.exports = pickRandomProb;