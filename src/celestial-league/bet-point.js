const readSheet = require('./read-sheet.js');
const writeSheet = require('./write-sheet.js');

async function betPoint(data, o, chat) {
    console.log("betting point");

    let userName = data[o]["author"]["name"];

    let message = data[o].message;
    let parsed_message = message.split(" ");
    let playerName = parsed_message[1];
    let inputPoint = parsed_message[2];

    if (playerName !== "1" && playerName !== "2" && playerName !== "3" && playerName !== "4") {
        await chat.send("결과를 선수번호(숫자)로 입력해주세요");
        return;
    }

    // change playerName using ./players.json
    let players = require('./players.json');
    let player = players[playerName];
    if (player) { playerName = player; }

    let sheetName = "포인트";
    let startCell = "B3";
    let endCell = "G500";

    let pointData = await readSheet(sheetName, startCell, endCell);

    let userPointData = pointData.find(row => row[1] === userName);

    if (userPointData) {
        console.log(inputPoint)
        let currentPoint = userPointData[2];
        console.log(currentPoint);

        // check if the user has already bet
        if (userPointData[3] !== "") {
            currentPoint = parseInt(currentPoint) + parseInt(userPointData[4]);
            userPointData[2] = currentPoint;
        }

        if (currentPoint < inputPoint) {
            await chat.send("포인트가 부족합니다");
            return;
        }
        else {
            userPointData[2] = currentPoint - inputPoint;
            userPointData[3] = playerName;
            userPointData[4] = inputPoint;
            userPointData[5] = "";

            await writeSheet(sheetName, startCell, endCell, pointData);
            await chat.send(`${playerName}번 선수를 ${inputPoint}포인트만큼 응원해요`);
        }
    }
    else {
        await chat.send("등록된 계정이 없습니다. 닉네임을 변경하셨다면 관리자에게 문의해주세요")
    }
}

module.exports = betPoint;