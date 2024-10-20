const readJson = require("../util/read-json.js");
const pickRandom = require("../util/pick-random.js");

async function hmsCharacterGacha(chat) {
    const hmsJson = "./data/hms-character.json";
    const data = await readJson(hmsJson);
    const result = await pickRandom(data);
    console.log(result);
    await chat.send(result);
}

module.exports = hmsCharacterGacha;