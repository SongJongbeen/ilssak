const readSheet = require('./read-sheet.js');
const writeSheet = require('./write-sheet.js');

async function buyTicket(data, o, chat) {
    console.log("buying ticket");

    let userName = data[o]["author"]["name"];

    // check if there is a userName in the sheet
    const sheetName = "포인트";
    const startCell = "B3";
    const endCell = "H500";

    let pointData = await readSheet(sheetName, startCell, endCell);

    let userPointData = pointData.find(row => row[1] === userName);

    if (userPointData) {
        let userPointData = pointData.find(row => row[1] === userName);
        let currentPoint = userPointData[2];

        if (currentPoint < 10000) {
            await chat.send("포인트가 부족합니다");
            return;
        }
        else {
            userPointData[2] = currentPoint - 10000;
            userPointData[5] = "-10000";
            userPointData[6] = parseInt(userPointData[6]) + 1;
            userPointData[6] = userPointData[6].toString();
            await writeSheet(sheetName, startCell, endCell, pointData);
            await chat.send("혼천선수 출전우대권을 구매하였습니다");
        }
    }
    else {
        await chat.send("등록된 계정이 없습니다. 닉네임을 변경하셨다면 관리자에게 문의해주세요")
    }
}

module.exports = buyTicket;