const accessKoromo = require('./access-koromo.js');  // 앞서 리팩토링한 모듈을 참조
const parseUserName = require('../util/parse-name.js');  // 유틸리티 함수를 별도 모듈로 관리
const formatRate = require("../util/format-rate.js");

async function searchStat(data, o, chat) {
    try {
        const userName = parseUserName(data[o].message);
        const result = await accessKoromo(userName);

        const riichiRate = await formatRate(result.立直率 * 100);
        const damaRate = await formatRate(result.默听率 * 100);
        const callRate = await formatRate(result.副露率 * 100);

        console.log(riichiRate);
        console.log(damaRate);
        console.log(callRate);

        const winRate = await formatRate(result.和牌率 * 100);
        const dealInRate = await formatRate(result.放铳率 * 100);

        stat = `리치율: ${riichiRate}%, 다마율: ${damaRate}%, 후로율: ${callRate}%, 화료율: ${winRate}%, 방총률: ${dealInRate}%`;

        await chat.send(stat);
    } catch (error) {
        console.error("Error fetching player stats: ", error);
        await chat.send(`코로모 통계 검색 중 오류가 발생했습니다: ${error.message}`);
    }
}

module.exports = searchStat;
