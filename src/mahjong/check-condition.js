const readJson = require("../util/read-json.js");

async function checkCondition(data, o, chat) {
    const scoresJson = "./data/scores.json";
    const scoresData = await readJson(scoresJson);

    const message = data[o].message;
    const parsed_message = message.split(" ");
    let isDealer = parsed_message[1]; if (isDealer === "친" || isDealer === "오야") { isDealer = "선"; }
    let conditionScore = parsed_message[2];
    let bonusScore = "";
    bonusScore = parsed_message[3];
    let bonusRound = "";
    bonusRound = parsed_message[4];

    conditionScore = parseInt(conditionScore, 10);
    bonusScore = parseInt(bonusScore, 10); if (isNaN(bonusScore)) { bonusScore = 0; }
    bonusRound = parseInt(bonusRound, 10); if (isNaN(bonusRound)) { bonusRound = 0; }
    conditionScore = conditionScore - bonusScore;
    conditionScore = conditionScore - (bonusRound * 100);

    if (isDealer === "선") { 
        if (conditionScore >  11600) { result = await overMangan(conditionScore, true); }
    }

    else if (isDealer === "자") { 
        if (conditionScore >= 7700) { result = await overMangan(conditionScore, false); }
    }

    const results = { 친: [], 자: [] };
    
    for (const key in scoresData) {
        const [han, fu] = key.split(' ');
        if (fu === undefined) continue;
        const [friendly, enemy] = scoresData[key].split(' ').map(Number);
        
        // 친 (Friendly) condition
        if (friendly >= conditionScore && results.친[han] === undefined) {
            results.친[han] = fu;
        }
        
        // 자 (Enemy) condition
        if (enemy >= conditionScore && results.자[han] === undefined) {
            results.자[han] = fu;
        }
    }

    let 친 = "";
    let 자 = "";

    for (const han in results.친) { 친 += `${han}판 ${results.친[han]}부 / `; }
    for (const han in results.자) { 자 += `${han}판 ${results.자[han]}부 / `; }

    친 = 친.slice(0, -3);
    자 = 자.slice(0, -3);

    if (conditionScore >  11600) { 친 = await overMangan(conditionScore, true); }
    if (conditionScore >= 7700) { 자 = await overMangan(conditionScore, false); }


    console.log(`(친) ${친}`);
    await chat.send(`(친) ${친}`);
    setTimeout(() => {}, 30);
    console.log(`(자) ${자}`);
    await chat.send(`(자) ${자}`);
}

async function overMangan(conditionScore, dealer) {
    if (dealer) {
        if (conditionScore > 288000) { return "6배역만도 모자라요"; }
        else if (conditionScore > 240000) { return "6배역만"; }
        else if (conditionScore > 192000) { return "5배역만"; }
        else if (conditionScore > 144000) { return "4배역만"; }
        else if (conditionScore > 96000) { return "3배역만"; }
        else if (conditionScore > 48000) { return "2배역만"; }
        else if (conditionScore > 36000) { return "역만"; }
        else if (conditionScore > 24000) { return "삼배만"; }
        else if (conditionScore > 18000) { return "배만"; }
        else if (conditionScore > 12000) { return "하네만"; }
        else if (conditionScore > 11600) { return "만관"; }
    }
    else {
        if (conditionScore > 192000) { return "6배역만도 모자라요"; }
        else if (conditionScore > 160000) { return "6배역만"; }
        else if (conditionScore > 128000) { return "5배역만"; }
        else if (conditionScore > 96000) { return "4배역만"; }
        else if (conditionScore > 64000) { return "3배역만"; }
        else if (conditionScore > 32000) { return "2배역만"; }
        else if (conditionScore > 24000) { return "역만"; }
        else if (conditionScore > 16000) { return "삼배만"; }
        else if (conditionScore > 12000) { return "배만"; }
        else if (conditionScore > 8000) { return "하네만"; }
        else if (conditionScore > 7700) { return "만관"; }
    }
}

module.exports = checkCondition;