const readSheet = require("./read-sheet");
const writeSheet = require("./write-sheet");
const checkAuthority = require("../util/check-authority");

async function organizeRanking(data, o, chat, streamerName) {
    console.log("Organizing ranking");

    // 권한 확인
    if (!await checkAuthority(data, o, chat, streamerName)) {
        chat.send("랭킹을 정리할 권한이 없습니다");
        return;
    }

    const message = data[o].message;

    const sheetName = "내전랭킹";
    const startCell = "A2";
    const endCell = "F5000";
    let spreadsheetID = "";
    if (streamerName === "모찌유키 MochiYuki") { spreadsheetID = process.env.YUKI_SPREADSHEET_ID; }
    else if (streamerName === "금성경") { spreadsheetID = process.env.YUKI_SPREADSHEET_ID; }

    let rankPointData = await readSheet(sheetName, startCell, endCell, spreadsheetID);

    let lastRow = rankPointData.length;
    lastRow = lastRow.toString();
    lastRow = lastRow / 4;

    let userStats = {};

    for (let i = 0; i < rankPointData.length; i++) {
        let user = rankPointData[i][2];
        let score = rankPointData[i][3];
        let rank = rankPointData[i][4];
        let point = rankPointData[i][5];

        score = parseFloat(score);
        rank = parseFloat(rank);
        point = parseFloat(point);

        if (!userStats[user]) {
            userStats[user] = {
                games: 0,
                totalRank: 0,
                totalPoint: 0,
                totalScore: 0,      // 총 점수
                rank1Count: 0,      // 1위 횟수
                rank2Count: 0,      // 2위 횟수
                rank3Count: 0,      // 3위 횟수
                rank4Count: 0       // 4위 횟수
            };
        }

        userStats[user].games++;
        userStats[user].totalRank += rank;
        userStats[user].totalPoint += point;
        userStats[user].totalScore += (score - 25000);  // 25000을 뺀 득점 계산

        // 순위별 카운트 증가
        switch(rank) {
            case 1: userStats[user].rank1Count++; break;
            case 2: userStats[user].rank2Count++; break;
            case 3: userStats[user].rank3Count++; break;
            case 4: userStats[user].rank4Count++; break;
        }
    }

    // 통계 데이터를 스프레드시트 형식으로 변환
    let statsData = [];
    for (let user in userStats) {
        const stats = userStats[user];
        const games = stats.games;
        const avgRank = (stats.totalRank / games).toFixed(2);
        const avgPoint = (stats.totalPoint / games).toFixed(1);
        const avgScore = (stats.totalScore / games).toFixed(1);  // 평균 득점
        const rank1Rate = ((stats.rank1Count / games) * 100).toFixed(1);  // 1위율
        const topRate = (((stats.rank1Count + stats.rank2Count) / games) * 100).toFixed(1);  // 연대율
        const rank4Rate = ((stats.rank4Count / games) * 100).toFixed(1);  // 4위율

        statsData.push([
            user,                   // H열: 유저명
            stats.totalPoint,       // I열: 총점
            games,                  // J열: 경기수
            avgRank,               // K열: 평균 순위
            avgPoint,              // L열: 평균 우마
            avgScore,              // M열: 평균 득점
            rank1Rate,             // N열: 1위율
            topRate,               // O열: 연대율
            rank4Rate,             // P열: 4위율
            stats.rank1Count,      // Q열: 1위 수
            stats.rank2Count,      // R열: 2위 수
            stats.rank3Count,      // S열: 3위 수
            stats.rank4Count       // T열: 4위 수
        ]);
    }

    // 총점 기준으로 정렬
    statsData.sort((a, b) => b[1] - a[1]);

    console.log(statsData);

    // 스프레드시트에 쓰기 (범위 확장)
    await writeSheet(sheetName, "H2", "T100", statsData, spreadsheetID);

    chat.send("랭킹이 정리되었습니다.");
}

module.exports = organizeRanking;
