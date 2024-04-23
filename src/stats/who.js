const accessKoromo = require('./access-koromo.js');  // 앞서 리팩토링한 모듈을 참조
const parseUserName = require('../util/parse-name.js');  // 유틸리티 함수를 별도 모듈로 관리
const formatRate = require("../util/format-rate.js");

async function who(data, o, chat) {
    try {
        const userName = parseUserName(data[o].message);
        const result = await accessKoromo(userName);

        const riichiRate = await formatRate(result.立直率 * 100);
        const callRate = await formatRate(result.副露率 * 100);

        const winRate = await formatRate(result.和牌率 * 100);
        const dealInRate = await formatRate(result.放铳率 * 100);

        const speedRate = await formatRate(result.和了巡数);
        const rankRate = await formatRate(result.avg_rank);
        const gosuRate = winRate - dealInRate;

        let riichiType = '';
        let attackType = '';
        let callType = '';
        let speedType = '';
        let rankType = '';
        let gosuType = '';

        if (riichiRate >= 19.01) { riichiType = '리치형'; } else { riichiType = '다마형'; }
        if (winRate >= 20.83) { attackType = '공격형'; } else { attackType = '수비형'; }
        if (callRate >= 32.30) { callType = '후로형'; } else { callType = '멘젠형'; }
        if (speedRate >= 12.21) { speedType = '지공형'; } else { speedType = '속공형'; }
        if (rankRate >= 2.5) { rankType = '고대형'; } else { rankType = '연대형'; }
        if (gosuRate >= 12.00) { gosuType = '양학중'; } else { gosuType = '현지인'; }

        stat = `${userName}: ${riichiType} / ${attackType} / ${callType} / ${speedType} / ${rankType} / ${gosuType}입니다.`;

        await chat.send(stat);
    } catch (error) {
        console.error("Error fetching player stats: ", error);
        await chat.send(`코로모 통계 검색 중 오류가 발생했습니다: ${error.message}`);
    }
}

module.exports = who;
