const readSheet = require('./read-sheet.js');
const writeSheet = require('./write-sheet.js');
const logger = require('./logger.js');
const { Mutex } = require('async-mutex');
const mutex = new Mutex();

async function betPoint(data, o, chat) {
    logger.info("betting point");

    let userName = data[o]["author"]["name"];

    let message = data[o].message;
    let parsed_message = message.split(" ");
    let playerName = parsed_message[1];
    let inputPoint = parsed_message[2];

    if (parseInt(inputPoint) < 100) { await chat.send("100포인트 이상부터 응원할 수 있어요"); return; }

    if (playerName !== "1" && playerName !== "2" && playerName !== "3" && playerName !== "4") {
        await chat.send("결과를 선수번호(숫자)로 입력해주세요");
        return;
    }

    if (inputPoint === undefined | inputPoint === null) { await chat.send("포인트를 입력해주세요"); return; }

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
        let currentPoint = userPointData[2];
        if (currentPoint === undefined && isNaN(currentPoint))
            { await chat.send(`${playerName}님 다시 시도해주세요`) }
    }

    if (userPointData) {
        let currentPoint = userPointData[2];

        currentPoint = parseInt(currentPoint);
        inputPoint = parseInt(inputPoint);

        // check if the user has already bet
        if (!isNaN(userPointData[3]) && userPointData[3] !== undefined && userPointData[3] !== "" && userPointData[3] !== null) {
            if (!isNaN(userPointData[4]) && userPointData[4] !== undefined && userPointData[4] !== "" && userPointData[4] !== null) {
                currentPoint = parseInt(currentPoint) + parseInt(userPointData[4]);
            }
            userPointData[2] = currentPoint;
        }

        const release = await mutex.acquire();
        currentPoint = parseInt(currentPoint);
        inputPoint = parseInt(inputPoint);

        console.log(currentPoint, inputPoint);

        try {
            if (currentPoint < inputPoint) {
                await chat.send("포인트가 부족합니다");
                return;
            }
            else {
                userPointData[2] = (currentPoint - inputPoint).toString();
                userPointData[3] = playerName;
                userPointData[4] = inputPoint.toString();
                userPointData[5] = "";

                await writeSheet(sheetName, startCell, endCell, pointData);
                await chat.send(`${userName} 응원 완료!`);
            }
        }
        finally {
            release();
        }
    }
    else {
        await chat.send("등록된 계정이 없습니다. 닉네임을 변경하셨다면 관리자에게 문의해주세요")  
    }
}

module.exports = betPoint;
