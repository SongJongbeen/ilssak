const readSheet = require("./read-sheet");
const writeSheet = require("./write-sheet");
const checkAuthority = require("../util/check-authority");

async function calculateRankPoint(data, o, chat, streamerName) {
    console.log("Calculating rank point");

    // 권한 확인
    if (!await checkAuthority(data, o, chat, streamerName)) {
        chat.send("랭킹을 기록할 권한이 없습니다");
        return;
    }

    const message = data[o].message;
    
    // 메시지를 파싱하여 플레이어와 점수를 추출
    let [_, first_player, first_score, second_player, second_score, third_player, third_score, fourth_player, fourth_score] = message.split(" ");
    first_score = Number(first_score);
    second_score = Number(second_score);
    third_score = Number(third_score);
    fourth_score = Number(fourth_score);

    // 플레이어와 점수를 배열에 저장
    let players = [
        { name: first_player, score: first_score },
        { name: second_player, score: second_score },
        { name: third_player, score: third_score },
        { name: fourth_player, score: fourth_score },
    ];

    // 점수를 기준으로 정렬 (내림차순)
    players.sort((a, b) => b.score - a.score);

    // 순위를 계산하여 추가
    players.forEach((player, index) => {
        player.rank = index + 1; // 순위는 1부터 시작
    });

    // add +20000 to the 1st place
    players[0].point = players[0].score + 20000;

    players[0].point = players[0].point - 30000;
    players[1].point = players[1].score - 30000;
    players[2].point = players[2].score - 30000;
    players[3].point = players[3].score - 30000;

    players[0].point = players[0].point / 1000;
    players[1].point = players[1].point / 1000;
    players[2].point = players[2].point / 1000;
    players[3].point = players[3].point / 1000;

    players[0].point = players[0].point + 30;
    players[1].point = players[1].point + 10;
    players[2].point = players[2].point - 10;
    players[3].point = players[3].point - 30;

    // 결과 출력
    players.forEach(player => {
        console.log(`Player: ${player.name}, Score: ${player.score}, Rank: ${player.rank}, Point: ${player.point}`);
    });

    // 날짜 출력 (KST)
    const date = new Date();
    const formattedDate = date.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });

    // 스프레드시트에 저장
    const sheetName = "내전랭킹";
    const startCell = "A2";
    const endCell = "F5000";
    let spreadsheetID = "";
    if (streamerName === "모찌유키 MochiYuki") { spreadsheetID = process.env.YUKI_SPREADSHEET_ID; }
    else if (streamerName === "금성경") { spreadsheetID = process.env.YUKI_SPREADSHEET_ID; }
    // else if (streamerName === "해모수보컬") { spreadsheetID = process.env.HMS_SPREADSHEET_ID; }
    // else if (streamerName === "병겜임") { spreadsheetID = process.env.BGI_SPREADSHEET_ID; }
    // else if (streamerName === "캐피탈호") { spreadsheetID = process.env.CAPITAL_SPREADSHEET_ID; }

    let rankPointData = await readSheet(sheetName, startCell, endCell, spreadsheetID);

    let lastRow = rankPointData.length;
    lastRow = lastRow.toString();
    lastRow = lastRow / 4;

    rankPointData.push([lastRow, formattedDate, players[0].name, players[0].score, players[0].rank, players[0].point]);
    rankPointData.push([lastRow, formattedDate, players[1].name, players[1].score, players[1].rank, players[1].point]);
    rankPointData.push([lastRow, formattedDate, players[2].name, players[2].score, players[2].rank, players[2].point]);
    rankPointData.push([lastRow, formattedDate, players[3].name, players[3].score, players[3].rank, players[3].point]);

    await writeSheet(sheetName, startCell, endCell, rankPointData, spreadsheetID);

    let rankData = await readSheet(sheetName, "H2", "I5000", spreadsheetID);

    // check if the username exists in the rankData, and if it does not, add it to the rankData
    for (let i = 0; i < players.length; i++) {
        if (rankData.find(row => row[0] === players[i].name)) {
            continue;
        }
        rankData.push([players[i].name, 0]);
    }

    for (let i = 0; i < rankData.length; i++) {
        rankData[i][1] = "=SUMIF(C$2:C$5000, H" + (i + 2).toString() + ", F$2:F$5000)";
    }

    await writeSheet(sheetName, "H2", "I5000", rankData, spreadsheetID);

    await chat.send("내전 랭킹이 등록되었습니다");
}

module.exports = calculateRankPoint;
