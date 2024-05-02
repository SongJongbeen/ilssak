const readSheet = require('./read-sheet.js');
const logger = require('./logger.js');

async function getFirstRound(data, o, chat) {
    logger.info("getting first round result");
    let message = data[o].message;

    const sheetName = "상금분배시트";
    const startCell = "B11";
    const endCell = "D14";
    let resultData = await readSheet(sheetName, startCell, endCell);

    let firstData = resultData.find(row => row[0] === "1");
    let secondData = resultData.find(row => row[0] === "2");
    let thirdData = resultData.find(row => row[0] === "3");
    let fourthData = resultData.find(row => row[0] === "4");

    const result = `1회전 결과: ${firstData[2]} (${firstData[1]}), ${secondData[2]} (${secondData[1]}), ${thirdData[2]} (${thirdData[1]}), ${fourthData[2]} (${fourthData[1]})`
    await chat.send(result);
}

module.exports = getFirstRound;