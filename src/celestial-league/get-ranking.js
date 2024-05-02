const readSheet = require('./read-sheet.js');
const logger = require('./logger');

async function getRank(data, o, chat) {
    logger.info("getting rank");
    let message = data[o].message;

    const sheetName = "선수 순위";
    const startCell = "B3";
    const endCell = "D19";
    let rankData = await readSheet(sheetName, startCell, endCell);

    let rankPerson = [rankData[0][1], rankData[1][1], rankData[2][1], rankData[3][1], rankData[4][1], rankData[5][1], rankData[6][1], rankData[7][1], rankData[8][1], rankData[9][1], rankData[10][1], rankData[11][1], rankData[12][1], rankData[13][1], rankData[14][1], rankData[15][1], rankData[16][1]];

    const topRank = `1위 ${rankPerson[0]}, 2위 ${rankPerson[1]}, 3위 ${rankPerson[2]}, 4위 ${rankPerson[3]}, 5위 ${rankPerson[4]}`

    if (message === "!순위") { await chat.send(topRank) }
    else {
        const query = message.split(" ")[1];
        const result = rankData.find(row => row[1] === query);
        const specificRank = `${result[0]}위 ${result[1]} (승점: ${result[2]})`
        await chat.send(specificRank);
    }
}

module.exports = getRank;