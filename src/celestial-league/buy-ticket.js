const readSheet = require('./read-sheet.js');
const writeSheet = require('./write-sheet.js');
const logger = require('./logger.js');

async function buyTicket(data, o, chat) {
    logger.info("buying ticket");

    let userName = data[o]["author"]["name"];
    let message = data[o]["message"];
    let parsedMessage = message.split(" ");
    let playerName = parsedMessage[1];

    if (playerName === "") { await chat.send("슈참권을 선물할 선수를 입력해주세요"); return; }

    // check if there is a userName in the sheet
    const sheetName = "포인트";
    const startCell = "B3";
    const endCell = "H5000";

    let pointData = await readSheet(sheetName, startCell, endCell);

    let userPointData = pointData.find(row => row[1] === userName);

    if (userPointData) {
        let userPointData = pointData.find(row => row[1] === userName);
        let currentPoint = userPointData[2];
        currentPoint = parseInt(currentPoint);

        if (currentPoint < 10000) {
            await chat.send("포인트가 부족합니다");
            return;
        }
        else {
            userPointData[2] = currentPoint - 10000;
            await writeSheet(sheetName, startCell, endCell, pointData);
        }

        let ticketSheetName = "선수우대권";
        let ticketStartCell = "B3";
        let ticketEndCell = "E500";

        let ticketData = await readSheet(ticketSheetName, ticketStartCell, ticketEndCell);
        let lastRow = ticketData.length;

        ticketData.push([lastRow, userName, playerName, "false"]);

        await writeSheet(ticketSheetName, ticketStartCell, ticketEndCell, ticketData);
        await chat.send(`${userName}님이 ${playerName}선수의 슈퍼참여권을 구매하였습니다`)
    }

    else {
        await chat.send("등록된 계정이 없습니다. 닉네임을 변경하셨다면 관리자에게 문의해주세요")
    }
}

module.exports = buyTicket;