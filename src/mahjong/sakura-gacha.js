const readJson = require("../util/read-json.js");
const pickRandomProb = require("../util/pick-random-prob.js");

async function sakuraGacha(chat) {
    const sakuraJson = "./data/sakura-road.json";
    const data = await readJson(sakuraJson);
    const result = await pickRandomProb(data);
    console.log(result);
    await chat.send(result);
}

module.exports = sakuraGacha;