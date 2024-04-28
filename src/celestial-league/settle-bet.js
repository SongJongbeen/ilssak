const readSheet = require('./read-sheet.js');
const writeSheet = require('./write-sheet.js');

async function settleBet(data, o, chat) {
    console.log("settling bet");

    let userName = data[o]["author"]["name"];

    if (userName !== "금성경" && userName !== "일급천재") {
        await chat.send("정산할 권한이 없습니다");
        return;
    }

    let message = data[o].message;
    let parsed_message = message.split(" ");
    let winner = parsed_message[1];

    // change playerName using ./players.json
    let players = require('./players.json');
    let player = players[winner];
    if (player) { winner = player; }

    const sheetName = "포인트";
    const startCell = "B4";
    const endCell = "H500";

    let pointData = await readSheet(sheetName, startCell, endCell);

    console.log(pointData);

    let totalBetAmount = 0;
    let totalCorrectAmount = 0;

    pointData.forEach(row => {
        totalBetAmount += parseInt(row[4]);
        if (row[3] === winner) {
            totalCorrectAmount += parseInt(row[4]);
        }
    })

    console.log(`Total bet amount: ${totalBetAmount}`);
    console.log(`Total correct amount: ${totalCorrectAmount}`);

    pointData.forEach(row => {
        if (row[3] == winner) {
            let currentPoints = parseInt(row[2]); // 현재 보유 포인트
            let betAmount = parseInt(row[4]); // 베팅 금액
            let deltaValue = parseInt(row[5]); // 변동 포인트

            let rewardAmount = Math.floor((betAmount / totalCorrectAmount) * totalBetAmount); // 보상 금액

            let resultAmount = rewardAmount.toString(); // 결과 금액
            let newPoints = parseInt(currentPoints) + parseInt(resultAmount); // 결과를 포함한 새로운 포인트
            
            row[2] = newPoints.toString();
            row[5] = rewardAmount.toString();

            console.log(`User ${row[1]} current points: ${currentPoints}`);
            console.log(`User ${row[1]} bet amount: ${betAmount}`);
            console.log(`User ${row[1]} reward amount: ${rewardAmount}`);
            console.log(`User ${row[1]} new points: ${newPoints}`);
            console.log();
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