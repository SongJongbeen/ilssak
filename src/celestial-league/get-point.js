const readSheet = require('./read-sheet');
const logger = require('./logger.js');

async function getPoint(data, o, chat) {
    logger.info("getting point");

    let userName = data[o]["author"]["name"];

    let message = data[o].message;
    
    // check if there is a userName in the sheet
    const sheetName = "포인트";
    const startCell = "B3";
    const endCell = "H500";

    let pointData = await readSheet(sheetName, startCell, endCell);

    let userPointData = pointData.find(row => row[1] === userName);

    if (userPointData) {
        let currentPoint = userPointData[2];
        await chat.send(`${userName}님의 현재 포인트: ${currentPoint}`);
    }

    else {
        await chat.send("등록된 계정이 없습니다. 닉네임을 변경하셨다면 관리자에게 문의해주세요");
    }
}

module.exports = getPoint;