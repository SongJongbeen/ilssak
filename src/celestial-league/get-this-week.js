const readSheet = require('./read-sheet.js');
const logger = require('./logger.js');

async function getThisWeek(data, o, chat) {
    logger.info("getting this week");

    const userMessage = data[o].message;

    const sheetName = "이번주 출전 선수";
    const startCell = "B4";
    const endCell = "R7";
    let PersonalData = await readSheet(sheetName, startCell, endCell);

    const AvgStartCell = "K9";
    const AvgEndCell = "R10";
    let AvgData = await readSheet(sheetName, AvgStartCell, AvgEndCell);

    let participants = [PersonalData[0][0], PersonalData[1][0], PersonalData[2][0], PersonalData[3][0]];
    let participantsName = [PersonalData[0][1], PersonalData[1][1], PersonalData[2][1], PersonalData[3][1]];
    let winPoints = [PersonalData[0][2], PersonalData[1][2], PersonalData[2][2], PersonalData[3][2]];
    let avgPoints = [PersonalData[0][3], PersonalData[1][3], PersonalData[2][3], PersonalData[3][3]];
    let gameNumbers = [PersonalData[0][4], PersonalData[1][4], PersonalData[2][4], PersonalData[3][4]];
    let firstRates = [PersonalData[0][5], PersonalData[1][5], PersonalData[2][5], PersonalData[3][5]];
    let firstSecondRates = [PersonalData[0][6], PersonalData[1][6], PersonalData[2][6], PersonalData[3][6]];
    let dodgeRates = [PersonalData[0][7], PersonalData[1][7], PersonalData[2][7], PersonalData[3][7]];
    let avgRank = [PersonalData[0][8], PersonalData[1][8], PersonalData[2][8], PersonalData[3][8]];
    let winRates = [PersonalData[0][9], PersonalData[1][9], PersonalData[2][9], PersonalData[3][9]];
    let loseRates = [PersonalData[0][10], PersonalData[1][10], PersonalData[2][10], PersonalData[3][10]];
    let riichiRates = [PersonalData[0][11], PersonalData[1][11], PersonalData[2][11], PersonalData[3][11]];
    let riichiSuccessRates = [PersonalData[0][12], PersonalData[1][12], PersonalData[2][12], PersonalData[3][12]];
    let callRates = [PersonalData[0][13], PersonalData[1][13], PersonalData[2][13], PersonalData[3][13]];
    let callSuccessRates = [PersonalData[0][14], PersonalData[1][14], PersonalData[2][14], PersonalData[3][14]];
    let damaRates = [PersonalData[0][15], PersonalData[1][15], PersonalData[2][15], PersonalData[3][15]];
    let avgWinScores = [PersonalData[0][16], PersonalData[1][16], PersonalData[2][16], PersonalData[3][16]];
    let hwaBangRates = [(parseFloat(PersonalData[0][9]) - parseFloat(PersonalData[0][10])).toFixed(2), (parseFloat(PersonalData[1][9]) - parseFloat(PersonalData[1][10])).toFixed(2), (parseFloat(PersonalData[2][9]) - parseFloat(PersonalData[2][10])).toFixed(2), (parseFloat(PersonalData[3][9]) - parseFloat(PersonalData[3][10])).toFixed(2)];
    
    if (userMessage === "!이번주") { await chat.send(`이번주 출전선수: ${participants[0]} (${participantsName[0]}), ${participants[1]} (${participantsName[1]}), ${participants[2]} (${participantsName[2]}), ${participants[3]} (${participantsName[3]})`) }

    else if (userMessage === "!이번주 참가자") { await chat.send(`이번주 출전선수: ${participants[0]} (${participantsName[0]}), ${participants[1]} (${participantsName[1]}), ${participants[2]} (${participantsName[2]}), ${participants[3]} (${participantsName[3]})`) }

    else {
        const query = userMessage.split(" ")[1];
        if (query === "승점") { await chat.send(`이번주 승점: ${participants[0]} (${winPoints[0]}), ${participants[1]} (${winPoints[1]}), ${participants[2]} (${winPoints[2]}), ${participants[3]} (${winPoints[3]})`) }
        else if (query === "평균승점") { await chat.send(`이번주 평균승점: ${participants[0]} (${avgPoints[0]}), ${participants[1]} (${avgPoints[1]}), ${participants[2]} (${avgPoints[2]}), ${participants[3]} (${avgPoints[3]})`) }
        else if (query === "경기수") { await chat.send(`이번주 경기수: ${participants[0]} (${gameNumbers[0]}), ${participants[1]} (${gameNumbers[1]}), ${participants[2]} (${gameNumbers[2]}), ${participants[3]} (${gameNumbers[3]})`) }
        else if (query === "1위율") { await chat.send(`이번주 1위율: ${participants[0]} (${firstRates[0]}), ${participants[1]} (${firstRates[1]}), ${participants[2]} (${firstRates[2]}), ${participants[3]} (${firstRates[3]})`) }
        else if (query === "연대율") { await chat.send(`이번주 연대율: ${participants[0]} (${firstSecondRates[0]}), ${participants[1]} (${firstSecondRates[1]}), ${participants[2]} (${firstSecondRates[2]}), ${participants[3]} (${firstSecondRates[3]})`) }
        else if (query === "회피율") { await chat.send(`이번주 회피율: ${participants[0]} (${dodgeRates[0]}), ${participants[1]} (${dodgeRates[1]}), ${participants[2]} (${dodgeRates[2]}), ${participants[3]} (${dodgeRates[3]})`) }
        else if (query === "평균순위") { await chat.send(`이번주 평균순위: ${participants[0]} (${avgRank[0]}), ${participants[1]} (${avgRank[1]}), ${participants[2]} (${avgRank[2]}), ${participants[3]} (${avgRank[3]})`) }
        else if (query === "화료율") { await chat.send(`이번주 화료율: ${participants[0]} (${winRates[0]}), ${participants[1]} (${winRates[1]}), ${participants[2]} (${winRates[2]}), ${participants[3]} (${winRates[3]})`) }
        else if (query === "방총률") { await chat.send(`이번주 방총률: ${participants[0]} (${loseRates[0]}), ${participants[1]} (${loseRates[1]}), ${participants[2]} (${loseRates[2]}), ${participants[3]} (${loseRates[3]})`) }
        else if (query === "리치율") { await chat.send(`이번주 리치율: ${participants[0]} (${riichiRates[0]}), ${participants[1]} (${riichiRates[1]}), ${participants[2]} (${riichiRates[2]}), ${participants[3]} (${riichiRates[3]})`) }
        else if (query === "리치성공률") { await chat.send(`이번주 리치성공률: ${participants[0]} (${riichiSuccessRates[0]}), ${participants[1]} (${riichiSuccessRates[1]}), ${participants[2]} (${riichiSuccessRates[2]}), ${participants[3]} (${riichiSuccessRates[3]})`) }
        else if (query === "후로율") { await chat.send(`이번주 후로율: ${participants[0]} (${callRates[0]}), ${participants[1]} (${callRates[1]}), ${participants[2]} (${callRates[2]}), ${participants[3]} (${callRates[3]})`) }
        else if (query === "후로성공률") { await chat.send(`이번주 후로성공률: ${participants[0]} (${callSuccessRates[0]}), ${participants[1]} (${callSuccessRates[1]}), ${participants[2]} (${callSuccessRates[2]}), ${participants[3]} (${callSuccessRates[3]})`) }
        else if (query === "다마율") { await chat.send(`이번주 다마율: ${participants[0]} (${damaRates[0]}), ${participants[1]} (${damaRates[1]}), ${participants[2]} (${damaRates[2]}), ${participants[3]} (${damaRates[3]})`) }
        else if (query === "화방률") { await chat.send(`이번주 화방률: ${participants[0]} (${hwaBangRates[0]}), ${participants[1]} (${hwaBangRates[1]}), ${participants[2]} (${hwaBangRates[2]}), ${participants[3]} (${hwaBangRates[3]})`)}
        else if (query === "평균타점") { await chat.send(`이번주 평균타점: ${participants[0]} (${avgWinScores[0]}), ${participants[1]} (${avgWinScores[1]}), ${participants[2]} (${avgWinScores[2]}), ${participants[3]} (${avgWinScores[3]})`) }
        else if (query === "평균화료율") { await chat.send(`이번주 참가자들의 평균 화료율: ${AvgData[0][0]} (가중평균: ${AvgData[1][0]})`) }
        else if (query === "평균방총률") { await chat.send(`이번주 참가자들의 평균 방총률: ${AvgData[0][1]} (가중평균: ${AvgData[1][1]})`) }
        else if (query === "평균리치율") { await chat.send(`이번주 참가자들의 평균 리치율: ${AvgData[0][2]} (가중평균: ${AvgData[1][2]})`) }
        else if (query === "평균리치성공률") { await chat.send(`이번주 참가자들의 평균 리치성공률: ${AvgData[0][3]} (가중평균: ${AvgData[1][3]})`) }
        else if (query === "평균후로율") { await chat.send(`이번주 참가자들의 평균 후로율: ${AvgData[0][4]} (가중평균: ${AvgData[1][4]})`) }
        else if (query === "평균후로성공률") { await chat.send(`이번주 참가자들의 평균 후로성공률: ${AvgData[0][5]} (가중평균: ${AvgData[1][5]})`) }
        else if (query === "평균다마율") { await chat.send(`이번주 참가자들의 평균 다마율: ${AvgData[0][6]} (가중평균: ${AvgData[1][6]})`) }
        else if (query === "평균평균타점") { await chat.send(`이번주 참가자들의 평균 타점: ${AvgData[0][7]} (가중평균: ${AvgData[1][7]})`) }
        else { await chat.send("잘못된 명령어입니다") }
    }
}

module.exports = getThisWeek;