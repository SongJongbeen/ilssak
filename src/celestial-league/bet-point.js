const logger = require('./logger.js');
const { Mutex } = require('async-mutex');
const { getUserByName, updateBetting, updatePoints } = require('./db-operations.js');

const mutex = new Mutex();

async function betPoint(data, o, chat) {
    logger.info("betting point");

    let userName = data[o]["author"]["name"];
    let message = data[o].message;
    let parsed_message = message.split(" ");
    let playerNumber = parsed_message[1];
    let inputPoint = parsed_message[2];

    // 입력값 검증
    if (parseInt(inputPoint) < 100) { 
        await chat.send("100포인트 이상부터 응원할 수 있어요"); 
        return; 
    }

    if (playerNumber !== "1" && playerNumber !== "2" && playerNumber !== "3" && playerNumber !== "4") {
        await chat.send("결과를 선수번호(숫자)로 입력해주세요");
        return;
    } 

    if (inputPoint === undefined || inputPoint === null) { 
        await chat.send("포인트를 입력해주세요"); 
        return; 
    }

    // DB에서 유저 확인
    const user = await getUserByName(userName);
    if (!user) {
        await chat.send("등록된 계정이 없습니다. 닉네임을 변경하셨다면 관리자에게 문의해주세요");
        return;
    }

    const release = await mutex.acquire();
    try {
        // 이미 베팅한 경우, 기존 베팅 확인
        if (user.betting_player !== null && user.betting_point > 0) {
            // 기존 베팅 포인트 환불
            await updatePoints(userName, user.betting_point);
            await chat.send(`${userName}님: 기존 ${user.betting_player}번 선수 응원 ${user.betting_point}포인트가 환불되었습니다`);
        }

        // 새로운 베팅 정보 업데이트 (포인트 차감 포함)
        const result = await updateBetting(
            userName, 
            parseInt(playerNumber), 
            parseInt(inputPoint)
        );

        if (result.error) {
            throw new Error(result.error);
        }

        await chat.send(`${userName}님이 ${playerNumber}번 선수를 ${inputPoint}포인트로 응원하셨습니다!`);

    } catch (error) {
        logger.error("베팅 중 오류:", error);
        await chat.send("응원 처리 중 오류가 발생했습니다. 관리자에게 문의해주세요.");
    } finally {
        release();
    }
}

module.exports = betPoint;
