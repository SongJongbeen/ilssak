const readSheet = require('./read-sheet.js');
const writeSheet = require('./write-sheet.js');

async function betPoint(data, o, chat) {
    console.log("betting point");

    let userName = data[o]["author"]["name"];

    let message = data[o].message;
    if (message === "!베팅정보") { return; }
    let parsed_message = message.split(" ");
    let playerName = parsed_message[1];
    let inputPoint = parsed_message[2];

    // change playerName using ./players.json
    let players = require('./players.json');
    let player = players[playerName];
    if (player) { playerName = player; }

    let sheetName = "포인트";
    let startCell = "B3";
    let endCell = "H500";

    let pointData = await readSheet(sheetName, startCell, endCell);

    let userPointData = pointData.find(row => row[1] === userName);

    if (userPointData) {
        let currentPoint = userPointData[2];
        if (currentPoint < inputPoint) {
            await chat.send("포인트가 부족합니다");
            return;
        }
        else {
            userPointData[2] = currentPoint - inputPoint;
            userPointData[5] = "-" + inputPoint;
            userPointData[3] = playerName;
            userPointData[4] = inputPoint;

            await writeSheet(sheetName, startCell, endCell, pointData);
            await chat.send(`${playerName}에게 ${inputPoint}포인트를 베팅하였습니다`);
        }
    }
    else {
        await chat.send("등록된 계정이 없습니다. 닉네임을 변경하셨다면 관리자에게 문의해주세요")
    }
}

module.exports = betPoint;