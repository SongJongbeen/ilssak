const readJson = require("../util/read-json.js");
const pickRandomProb = require("../util/pick-random-prob.js");

async function bambooGacha(chat) {
    const bambooJson = "./data/bamboo-road.json";
    const data = await readJson(bambooJson);
    const result = await pickRandomProb(data);
    console.log(result);
    await chat.send(result);
}

module.exports = bambooGacha;