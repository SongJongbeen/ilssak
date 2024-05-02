const readSheet = require('./read-sheet.js');
const logger = require('./logger.js');

async function getResult(data, o, chat) {
    logger.info("getting result");
    // let message = data[o].message;

    const sheetName = "경기결과";
    const startCell = "B9";
    const endCell = "F12";
    let resultData = await readSheet(sheetName, startCell, endCell);

    result = `${resultData[0][0]}: ${resultData[0][1]} (상금: ${resultData[0][4]}), ${resultData[1][0]}: ${resultData[1][1]} (상금: ${resultData[1][4]}), ${resultData[2][0]}: ${resultData[2][1]} (상금: ${resultData[2][4]}), ${resultData[3][0]}: ${resultData[3][1]} (상금: ${resultData[3][4]})`

    await chat.send(result);
}

module.exports = getResult;