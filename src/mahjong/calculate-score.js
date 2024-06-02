const readJson = require("../util/read-json.js");

async function calculateScore(data, o, chat) {
    const scoreJson = "./data/scores.json";
    const scoreData = await readJson(scoreJson);

    const message = data[o].message;

    if (message === "!점수") { return; }

    try {
        const parsed_message = message.split(" ");
        let isDealer = parsed_message[1]; if (isDealer === "친" || isDealer === "오야") { isDealer = "선"; }
        const han = parsed_message[2];
        let overMangan = false; if (han > 5) { overMangan = true; }
        let fu = "";
        let result = "";

        if (!overMangan) { 
            fu = parsed_message[3]; 
            result = `(쯔모) ${scoreData[isDealer]["쯔모"][han][fu]}점 / (론) ${scoreData[isDealer]["론"][han][fu]}점 입니다`;
        }
        else {
            result = `(쯔모) ${scoreData[isDealer]["쯔모"][han]}점 / (론) ${scoreData[isDealer]["론"][han]}점 입니다`;
        }
    }
    catch (error) {
        console.error(error);
        await chat.send("명령어 실행 중 오류가 발생했습니다");
    }
    
    await chat.send(result);
}

module.exports = calculateScore;
