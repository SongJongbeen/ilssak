const readSheet = require('./read-sheet');

async function getDelta(data, o, chat) {
    console.log("getting delta");

    let userName = data[o]["author"]["name"];

    let message = data[o].message;

    // check if there is a userName in the sheet
    const sheetName = "포인트";
    const startCell = "B3";
    const endCell = "G500";

    let pointData = await readSheet(sheetName, startCell, endCell);

    let userPointData = pointData.find(row => row[1] === userName);

    if (userPointData) {
        let deltaPoint = userPointData[5];
        await chat.send(`${userName}님의 최근 응원 손익: ${deltaPoint}`);
    }

    else {
        await chat.send("등록된 계정이 없습니다. 닉네임을 변경하셨다면 관리자에게 문의해주세요");
    }
}

module.exports = getDelta;