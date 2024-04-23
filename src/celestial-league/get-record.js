const readSheet = require('./read-sheet.js');

async function getRecord(data, o, chat) {
    console.log("getting record");
    let message = data[o].message;

    const sheetName = "다시보기";
    const startCell = "B3";
    const endCell = "L80";
    let recordData = await readSheet(sheetName, startCell, endCell);

    let query1 = message.split(" ")[1];
    let query2 = message.split(" ")[2];

    const weekPattern = /^(\d+)주차$/;
    const match = query1.match(weekPattern);

    if (match) { query1 = match[1]; }

    let idx = parseInt(query1, 10) - 1;

    if (query2 === "우승자") { result = `${query1}주차 우승자는 ${recordData[idx][6]} 입니다`; }
    else if (query2 === "다시보기") { result = `${query1}주차 다시보기는 ${recordData[idx][7]} 입니다`; }
    else if (query2 === "경기결과") { result = `${query1}주차 경기결과글은 ${recordData[idx][8]} 입니다`; }
    else if (query2 === "참가자") {
        result = `${query1}주차 참가자는 ${recordData[idx][2]}, ${recordData[idx][3]}, ${recordData[idx][4]}, ${recordData[idx][5]} 입니다`;
    }

    await chat.send(result);
}

module.exports = getRecord;