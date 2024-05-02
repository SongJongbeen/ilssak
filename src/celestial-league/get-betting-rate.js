const readSheet = require('./read-sheet.js');
const logger = require('./logger');

async function getBettingRate(data, o, chat) {
    message = data[o].message;

    const sheetName = "포인트";
    const startCell = "B4";
    const endCell = "G500";

    let pointData = await readSheet(sheetName, startCell, endCell);

    let totalAmount = 0;
    let firstPlayerAmount = 0;
    let secondPlayerAmount = 0;
    let thirdPlayerAmount = 0;
    let fourthPlayerAmount = 0;

    let firstPlayerRate = "";
    let secondPlayerRate = "";
    let thirdPlayerRate = "";
    let fourthPlayerRate = "";

    let firstPlayerResult = "";
    let secondPlayerResult = "";
    let thirdPlayerResult = "";
    let fourthPlayerResult = "";

    pointData.forEach(row => {
        if (row[3] !== "") {
            totalAmount += parseInt(row[4]);
        }
        if (row[3] === "1") {
            firstPlayerAmount += parseInt(row[4]);
        }
        if (row[3] === "2") {
            secondPlayerAmount += parseInt(row[4]);
        }
        if (row[3] === "3") {
            thirdPlayerAmount += parseInt(row[4]);
        }
        if (row[3] === "4") {
            fourthPlayerAmount += parseInt(row[4]);
        }
    })

    if (totalAmount === 0) { await chat.send("베팅된 금액이 없습니다"); return; }
    if (firstPlayerAmount === 0) { firstPlayerRate = "0"; firstPlayerResult = "-"; }
    else { firstPlayerRate = (totalAmount / firstPlayerAmount).toFixed(2); firstPlayerResult = `1:${firstPlayerRate}`; }
    if (secondPlayerAmount === 0) { secondPlayerRate = "0"; secondPlayerResult = "-"; }
    else { secondPlayerRate = (totalAmount / secondPlayerAmount).toFixed(2); secondPlayerResult = `1:${secondPlayerRate}`; }
    if (thirdPlayerAmount === 0) { thirdPlayerRate = "0"; thirdPlayerResult = "-"; }
    else { thirdPlayerRate = (totalAmount / thirdPlayerAmount).toFixed(2); thirdPlayerResult = `1:${thirdPlayerRate}`; }
    if (fourthPlayerAmount === 0) { fourthPlayerRate = "0"; fourthPlayerResult = "-"; }
    else { fourthPlayerRate = (totalAmount / fourthPlayerAmount).toFixed(2); fourthPlayerResult = `1:${fourthPlayerRate}`; }
    
    await chat.send(`응원현황: 1번 선수 (${firstPlayerResult}), 2번 선수 (${secondPlayerResult}), 3번 선수 (${thirdPlayerResult}), 4번 선수 (${fourthPlayerResult})`);
}

module.exports = getBettingRate;