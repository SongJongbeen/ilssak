const readSheet = require('./read-sheet.js');
const writeSheet = require('./write-sheet.js');
const addPoint = require('./add-point.js');
const logger = require('./logger.js');

async function getAttendance(data, o, chat) {
    logger.info("getting attendance");

    let message = data[o].message;
    let userName = data[o]["author"]["name"];

    const dateStr = new Date().toLocaleString("en-US", {timeZone: "Asia/Seoul"});
    const [datePart] = dateStr.split(", ");
    const [month, day, year] = datePart.split("/");

    const formattedMonth = month.padStart(2, "0");
    const formattedDay = day.padStart(2, "0");

    const formattedDate = `${year}${formattedMonth}${formattedDay}`;

    const dayOfWeek = new Date(`${year}-${formattedMonth}-${formattedDay}`).getDay();

    if (dayOfWeek !== 3) { await chat.send("출석체크는 혼천리그가 열리는 수요일에만 가능합니다!"); return; }

    const sheetName = "출석체크";
    const startCell = "B2";
    const endCell = "E1000";
    let attendanceData = await readSheet(sheetName, startCell, endCell);

    let lastRow = attendanceData.length;
    lastRow = lastRow.toString();

    let isAlreadyChecked = false;
    for (let i = 0; i < attendanceData.length; i++) {
        if (attendanceData[i][1] === userName && attendanceData[i][2] === formattedDate) {
            isAlreadyChecked = true;
        }
    }

    if (isAlreadyChecked) {
        await chat.send("이미 출석체크를 하셨습니다");
        return;
    }

    let point = await addPoint(userName, 100);

    attendanceData.push([lastRow, userName, formattedDate, point]);

    logger.info(attendanceData);
    await writeSheet(sheetName, startCell, endCell, attendanceData);

    await chat.send(`${userName}님 출석체크 완료!`);
}

module.exports = getAttendance;
