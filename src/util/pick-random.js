async function pickRandom(data) {
    // dict에서 value를 랜덤으로 뽑아내는 함수
    const keys = Object.keys(data);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return data[randomKey];
}

module.exports = pickRandom;