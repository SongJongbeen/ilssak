const accessKoromo = require('./access-koromo.js');
const parseUserName = require('../util/parse-name.js');
const readJson = require('../util/read-json.js');
const formatRate = require("../util/format-rate.js");

async function searchKoromo(data, o, chat) {
    try {
        const userName = parseUserName(data[o].message);
        const result = await accessKoromo(userName);

        const tierNameJson = "./data/tier-name.json";
        const tierMaxLv = "./data/tier-max-lv.json";

        const tierNameData = await readJson(tierNameJson);
        const tierMaxLvData = await readJson(tierMaxLv);

        const tier = result.level?.id;
        const tierName = tierNameData[tier];
        const currentLv = result.level?.score + result.level?.delta;
        const maxLv = tierMaxLvData[tier];
        const avgRank = await formatRate(result.avg_rank);

        let koromoResult = `단위: ${tierName} (${currentLv}/${maxLv}), 평균순위: ${avgRank}`

        if (tier.toString().substring(0, 3) === '106' || tier.toString().substring(0, 3) === '107') {
            koromoResult = await processCelestial(result, avgRank);
        }
        
        await chat.send(koromoResult);
    } catch (error) {
        console.error("Error fetching player data: ", error);
        await chat.send(`코로모 검색 중 오류가 발생했습니다: ${error.message}`);
    }
}

async function processCelestial(result, avgRank) {
    const tier = result.level?.id;
    const tierName = "혼천";
    const tierLv = tier.toString().substring(3, 5);
    let currentLv = result.level?.score + result.level?.delta;
    currentLv = currentLv / 100;
    const maxLv = 20.00;
    
    koromoResult = `단위: ${tierName} lv.${tierLv} (${currentLv}/${maxLv}), 평균순위: ${avgRank}`;
    console.log(koromoResult);

    return koromoResult;
}

module.exports = searchKoromo;
