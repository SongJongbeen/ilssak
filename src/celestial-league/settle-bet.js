const logger = require('./logger.js');
const { getAllBettings, updatePoints, resetBetting } = require('./db-operations.js');

async function settleBet(data, o, chat) {
    logger.info("settling bet");

    let userName = data[o]["author"]["name"];

    // 권한 체크
    if (userName !== "금성경" && userName !== "일급천재") {
        await chat.send("정산할 권한이 없습니다");
        return;
    }

    let message = data[o].message;
    let parsed_message = message.split(" ");
    let winner = parsed_message[1];

    // 우승자 번호 검증
    if (winner !== "1" && winner !== "2" && winner !== "3" && winner !== "4") {
        await chat.send("결과를 선수번호(숫자)로 입력해주세요");
        return;
    }

    try {
        // 모든 베팅 정보 조회
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
            await chat.send("정산할 베팅이 없습니다");
            return;
        }

        // 우승자의 배당률 계산
        const winnerIndex = parseInt(winner) - 1;
        const winnerPoints = playerPoints[winnerIndex];
        const odds = totalPoints / winnerPoints;

        // 각 베팅에 대해 정산 처리
        for (const bet of bettings) {
            const betPlayer = parseInt(bet.betting_player);
            const betAmount = parseInt(bet.betting_point);

            if (betPlayer === parseInt(winner)) {
                // 승리한 선수에 베팅한 경우: 배당률에 따른 상금 지급
                const reward = Math.floor(betAmount * odds);
                await updatePoints(bet.user_name, reward);
                logger.info(`Winner ${bet.user_name}: bet ${betAmount}, won ${reward}`);
            }

            // 베팅 정보 초기화
            await resetBetting(bet.user_name);
        }

        // 정산 완료 메시지
        const rateRecord = 
            `정산 완료!\n` +
            `우승자 배당률: ${odds.toFixed(2)}배`;

        await chat.send(rateRecord);

    } catch (error) {
        logger.error("정산 중 오류:", error);
        await chat.send("정산 중 오류가 발생했습니다. 관리자에게 문의해주세요.");
    }
}

module.exports = settleBet;
