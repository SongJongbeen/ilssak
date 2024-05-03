const readSheet = require('./read-sheet.js');
const logger = require('./logger.js');

async function getPrize(data, o, chat) {
    logger.info("getting prize");
    let message = data[o].message;
    let player = message.split(" ")[1];

    if (player === "") { await chat.send("선수명을 입력해주세요"); return; }

    const sheetName = "정산시트";
    const startCell = "B4";
    const endCell = "F40";
    let prizeData = await readSheet(sheetName, startCell, endCell);

    let prize = prizeData.find(row => row[0] === player)[1];
    let result = `${player}의 누적 대회상금: ${prize}원`;
    await chat.send(result);
}

module.exports = getPrize;