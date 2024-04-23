const readJson = require("../util/read-json.js");

async function calculateScore(data, o, chat) {
    const scoreJson = "./data/scores.json";
    const scoreData = await readJson(scoreJson);

    const message = data[o].message;
    const parsed_message = message.slice(4);
    
    const result = `${scoreData[parsed_message]}점 입니다`;
    await chat.send(result);
}

module.exports = calculateScore;
