const readJson = require("../util/read-json.js");
const pickRandomProb = require("../util/pick-random-prob.js");

async function todayYaku(chat) {
    const yakuJson = "./data/yaku.json";
    const data = await readJson(yakuJson);
    const result = await pickRandomProb(data);
    console.log(result);
    await chat.send(result);
}

module.exports = todayYaku;