// deprecated

const readSheet = require('./read-sheet');
const logger = require('./logger.js');

async function getBettingInfo(data, o, chat) {
    logger.info("getting betting info");

    let userName = data[o]["author"]["name"];

    let message = data[o].message;

    // check if there is a userName in the sheet
    const sheetName = "포인트";
    const startCell = "B3";
    const endCell = "G5000";

    let pointData = await readSheet(sheetName, startCell, endCell);

    let userPointData = pointData.find(row => row[1] === userName);

    if (userPointData) {
        let playerName = userPointData[3];
        let bettingPoint = userPointData[4];
        if (playerName === "") { await chat.send("아직 응원한 선수가 없습니다"); }
        else { await chat.send(`${userName}님의 응원 정보: ${playerName}번 선수 (${bettingPoint})`); }
    }

    else {
        await chat.send("등록된 계정이 없습니다. 출첵한 적이 없다면 !출첵, 닉변 및 오류는 개발자를 불러주세요!");
    }
}

module.exports = getBettingInfo;