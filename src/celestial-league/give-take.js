const readSheet = require('./read-sheet.js');
const writeSheet = require('./write-sheet.js');
const logger = require('./logger.js');

async function givePoint(data, o, chat) {
    logger.info("giving point");

    let userName = data[o]["author"]["name"];

    let message = data[o].message;
    let parsed_message = message.split(" ");
    let inputUserName = parsed_message[1];
    let inputPoint = parsed_message[2];

    if (userName === "금성경" || userName === "일급천재") {
        let sheetName = "포인트";
        let startCell = "B3";
        let endCell = "G500";

        let pointData = await readSheet(sheetName, startCell, endCell);

        let userPointData = pointData.find(row => row[1] === inputUserName);

        if (userPointData) {
            let currentPoint = userPointData[2];
            userPointData[2] = parseInt(currentPoint) + parseInt(inputPoint);
            await writeSheet(sheetName, startCell, endCell, pointData);
            await chat.send(`${inputUserName}님에게 ${inputPoint}포인트를 지급하였습니다`);
        }
        else {
            await chat.send("등록된 계정이 없습니다. 해당 계정을 추가하겠습니다");
            let lastRow = pointData.length;
            lastRow = lastRow.toString();
            let newPointData = [lastRow, inputUserName, inputPoint, "", "", ""];
            pointData.push(newPointData);
            await writeSheet(sheetName, startCell, endCell, pointData);

            await new Promise(resolve => setTimeout(resolve, 1000));
            await chat.send(`${inputUserName}님에게 ${inputPoint}포인트를 지급하였습니다`);
        }
    }
    else { await chat.send("포인트를 지급할 권한이 없습니다"); return; }
}

async function takePoint(data, o, chat) {
    logger.info("taking point");

    let userName = data[o]["author"]["name"];

    let message = data[o].message;
    let parsed_message = message.split(" ");
    let inputUserName = parsed_message[1];
    let inputPoint = parsed_message[2];

    if (userName === "금성경" || userName === "일급천재") {
        let sheetName = "포인트";
        let startCell = "B3";
        let endCell = "G500";

        let pointData = await readSheet(sheetName, startCell, endCell);

        let userPointData = pointData.find(row => row[1] === inputUserName);

        if (userPointData) {
            let currentPoint = userPointData[2];
            userPointData[2] = parseInt(currentPoint) - parseInt(inputPoint);
            await writeSheet(sheetName, startCell, endCell, pointData);
            await chat.send(`${inputUserName}님으로부터 ${inputPoint}포인트를 차감하였습니다`);
        }
        else {
            await chat.send("등록된 계정이 없습니다. 해당 계정을 추가하겠습니다");
            let lastRow = pointData.length;
            lastRow = lastRow.toString();
            let newPointData = [lastRow, inputUserName, inputPoint, "", "", ""];
            pointData.push(newPointData);
            await writeSheet(sheetName, startCell, endCell, pointData);

            await new Promise(resolve => setTimeout(resolve, 1000));
            await chat.send(`${inputUserName}님으로부터 ${inputPoint}포인트를 차감하였습니다`);
        }
    }
    else { await chat.send("포인트를 차감할 권한이 없습니다"); return; }
}

module.exports = { givePoint, takePoint };