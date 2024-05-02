const readSheet = require('./read-sheet.js');

async function getPrize(data, o, chat) {
    console.log("getting prize");
    let message = data[o].message;
    let player = message.split(" ")[1];

    const sheetName = "정산시트";
    const startCell = "B4";
    const endCell = "F40";
    let prizeData = await readSheet(sheetName, startCell, endCell);

    let prize = prizeData.find(row => row[0] === player)[1];
    let result = `${player}의 누적 대회상금: ${prize}원`;
    await chat.send(result);
}

module.exports = getPrize;