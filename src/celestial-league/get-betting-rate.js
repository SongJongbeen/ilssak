const logger = require('./logger.js');
const { getAllBettings } = require('./db-operations.js');

async function getBettingRate(data, o, chat) {
    try {
        const bettings = await getAllBettings();
        
        // 각 선수별 베팅 포인트 합계 계산
        let totalPoints = 0;
        let playerPoints = [0, 0, 0, 0];  // 1~4번 선수의 베팅 포인트

        bettings.forEach(bet => {
            if (bet.betting_player && bet.betting_point) {
                const playerIndex = bet.betting_player - 1;
                playerPoints[playerIndex] += parseInt(bet.betting_point);
                totalPoints += parseInt(bet.betting_point);
            }
        });

        // 베팅이 없는 경우
        if (totalPoints === 0) { 
            await chat.send("베팅된 금액이 없습니다"); 
            return; 
        }

        // 각 선수별 배당률 계산 (소수점 2자리까지)
        const odds = playerPoints.map(points => 
            points > 0 ? (totalPoints / points).toFixed(2) : "0.00"
        );

        logger.info(`전체 포인트: ${totalPoints}, 배당률: ${odds.join(', ')}`);

        await chat.send(
            `현재 응원률:\n` +
            `1번 선수: ${odds[0]}배 (${playerPoints[0]}P)\n` +
            `2번 선수: ${odds[1]}배 (${playerPoints[1]}P)\n` +
            `3번 선수: ${odds[2]}배 (${playerPoints[2]}P)\n` +
            `4번 선수: ${odds[3]}배 (${playerPoints[3]}P)`
        );

    } catch (error) {
        logger.error("배당률 계산 중 오류:", error);
        await chat.send("배당률 계산 중 오류가 발생했습니다");
    }
}

module.exports = getBettingRate;