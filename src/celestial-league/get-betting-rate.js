const readSheet = require('./read-sheet.js');
const logger = require('./logger.js');
const e = require('express');

async function getBettingRate(data, o, chat) {
    message = data[o].message;

    const sheetName = "포인트";
    let startCell = "J2";
    let endCell = "J6";
    let rateData = await readSheet(sheetName, startCell, endCell);
    let entirePoint = rateData[0][0];
    let firstPlayerRate = rateData[1][0];
    let secondPlayerRate = rateData[2][0];
    let thirdPlayerRate = rateData[3][0];
    let fourthPlayerRate = rateData[4][0];

    logger.info(`entirePoint: ${entirePoint}, firstPlayerRate: ${firstPlayerRate}, secondPlayerRate: ${secondPlayerRate}, thirdPlayerRate: ${thirdPlayerRate}, fourthPlayerRate: ${fourthPlayerRate}`)

    if (entirePoint === 0) { await chat.send("베팅된 금액이 없습니다"); return; }
    
    await chat.send(`응원현황: 1번 선수 (${firstPlayerRate}), 2번 선수 (${secondPlayerRate}), 3번 선수 (${thirdPlayerRate}), 4번 선수 (${fourthPlayerRate})`);
}

module.exports = getBettingRate;