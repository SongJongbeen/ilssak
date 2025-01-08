const logger = require('./logger.js');
const { getUserByName } = require('./db-operations.js');

async function getPoint(data, o, chat) {
    logger.info("getting point");

    let userName = data[o]["author"]["name"];

    // DB에서 유저 정보 조회
    const user = await getUserByName(userName);
    
    if (user) {
        await chat.send(`${userName}님의 현재 포인트: ${user.current_point}`);
    } else {
        await chat.send("등록된 계정이 없습니다. 닉네임을 변경하셨다면 관리자에게 문의해주세요");
    }
}

module.exports = getPoint;