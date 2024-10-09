const readSheet = require('./read-sheet.js');
const writeSheet = require('./write-sheet.js');
const logger = require('./logger.js');

async function settleBet(data, o, chat) {
    logger.info("settling bet");

    let userName = data[o]["author"]["name"];

    if (userName !== "금성경" && userName !== "일급천재") {
        await chat.send("정산할 권한이 없습니다");
        return;
    }

    let message = data[o].message;
    let parsed_message = message.split(" ");
    let winner = parsed_message[1];

    if (winner !== "1" && winner !== "2" && winner !== "3" && winner !== "4") {
        await chat.send("결과를 선수번호(숫자)로 입력해주세요");
        return;
    }

    const dateStr = new Date().toLocaleString("en-US", {timeZone: "Asia/Seoul"});

    const sheetName = "포인트";
    let startCell = "J2";
    let endCell = "J6";
    let rateData = await readSheet(sheetName, startCell, endCell);
    let rateRecord = `[${dateStr}] 전체 베팅금액: ${rateData[0][0]}\n1번선수: ${rateData[1][0]}\n2번선수: ${rateData[2][0]}\n3번선수: ${rateData[3][0]}\n4번선수: ${rateData[4][0]}`;

    // change playerName using ./players.json
    let players = require('./players.json');
    let player = players[winner];
    if (player) { winner = player; }

    startCell = "B4";
    endCell = "G5000";

    let pointData = await readSheet(sheetName, startCell, endCell);

    let totalBetAmount = 0;
    let totalCorrectAmount = 0;

    pointData.forEach(row => {
        let betAmount = parseInt(row[4]);
        if (!isNaN(betAmount)) {
            if (row[3] !== "") {
                totalBetAmount += betAmount;
            }
            if (row[3] === winner) {
                totalCorrectAmount += betAmount;
            }
        }
    })

    logger.info(`Total bet amount: ${totalBetAmount}`);
    logger.info(`Total correct amount: ${totalCorrectAmount}`);

    pointData.forEach(row => {
        betAmount = parseInt(row[4]);
        if (!isNaN(betAmount) && row[3] !== winner) {
            row[5] = "-" + betAmount.toString();
        }
    })

    betRatio = 0.00;

    if (winner == "1") {
        betRatio = 4.96;
    }
    else if (winner == "2") {
        betRatio = 8.27;
    }
    else if (winner == "3") {
        betRatio = 10.54;
    }
    else if (winner == "4") {
        betRatio = 5.74;
    }

    pointData.forEach(row => {
        if (row[3] == winner) {
            let currentPoints = parseInt(row[2]); // 현재 보유 포인트
            let betAmount = parseInt(row[4]); // 베팅 금액

            let rewardAmount = Math.floor((betAmount / totalCorrectAmount) * totalBetAmount); // 보상 금액
            rewardAmount = parseInt(rewardAmount);
            // 배당률로 지급
            rewardAmount = betAmount * betRatio;
            rewardAmount = parseInt(rewardAmount);

            let deltaValue = rewardAmount - betAmount; // 변동 포인트
            deltaValue = "+" + deltaValue.toString();

            let resultAmount = rewardAmount.toString(); // 결과 금액
            let newPoints = parseInt(currentPoints) + parseInt(resultAmount); // 결과를 포함한 새로운 포인트
            
            row[2] = newPoints.toString();
            row[5] = deltaValue;
        }
    })

    pointData.forEach(row => {
        row[3] = "";
        row[4] = "";
    })

    await writeSheet(sheetName, startCell, endCell, pointData);

    await chat.send("정산이 완료되었습니다!");
}

module.exports = settleBet;
