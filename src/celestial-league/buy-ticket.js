const readSheet = require('./read-sheet.js');
const writeSheet = require('./write-sheet.js');
const logger = require('./logger.js');
const {
    getUserByName,
    updatePoints
} = require('./db-operations.js');

async function buyTicket(data, o, chat) {
    logger.info("buying ticket");

    let userName = data[o]["author"]["name"];
    let message = data[o]["message"];
    let parsedMessage = message.split(" ");
    let playerName = parsedMessage[1];

    if (playerName === "") { await chat.send("슈참권을 선물할 선수를 입력해주세요"); return; }


    let user = await getUserByName(userName);
    if (!user) { await chat.send("등록된 계정이 없습니다. 닉네임을 변경하셨다면 관리자에게 문의해주세요"); return; }

    let userPoint = user.point;
    if (userPoint < 100000) { await chat.send("포인트가 부족합니다"); return; }

    let ticketSheetName = "선수우대권";
    let ticketStartCell = "B3";
    let ticketEndCell = "E500";

    let ticketData = await readSheet(ticketSheetName, ticketStartCell, ticketEndCell);
    let lastRow = ticketData.length;

    try {
        // 1. 먼저 포인트 차감
        const pointResult = await updatePoints(userName, -100000);
        if (!pointResult || pointResult.error) {
            throw new Error('포인트 차감 실패');
        }

        // 2. 구글 시트에 기록 시도
        try {
            await writeSheet(ticketSheetName, ticketStartCell, ticketEndCell, ticketData);
        } catch (sheetError) {
            // 시트 기록 실패시 포인트 롤백
            await updatePoints(userName, 100000);
            throw new Error('티켓 기록 실패');
        }

        await chat.send(`${userName}님이 ${playerName}선수의 슈퍼참여권을 구매하였습니다`);

    } catch (error) {
        logger.error("티켓 구매 중 오류:", error);
        await chat.send("티켓 구매 중 오류가 발생했습니다. 관리자에게 문의해주세요.");
    }
}

module.exports = buyTicket;