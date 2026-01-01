const readSheet = require('./read-sheet.js');
const writeSheet = require('./write-sheet.js');

async function registerSchedule(data, o, chat, streamerName) {
    console.log("registering schedule")

    const message = data[o].message;
    const parsed_message = message.split(" ");

    let userName = data[o]["author"]["name"];

    const dateStr = new Date().toLocaleString("en-US", {timeZone: "Asia/Seoul"});
    const [datePart] = dateStr.split(", ");
    const [month, day, year] = datePart.split("/");

    const formattedMonth = month.padStart(2, "0");
    const formattedDay = day.padStart(2, "0");

    const formattedDate = `${year}${formattedMonth}${formattedDay}`;

    let schedule = parsed_message.slice(1).join(" ");
    
    const sheetName = "스케줄";
    const startCell = "A2";
    const endCell = "D100";
    let spreadsheetID = "";
    if (streamerName === "해모수보컬") { spreadsheetID = process.env.HMS_SPREADSHEET_ID; }
    else if (streamerName === "병겜임") { spreadsheetID = process.env.BGI_SPREADSHEET_ID; }
    else if (streamerName === "캐피탈호") { spreadsheetID = process.env.CAPITAL_SPREADSHEET_ID; }
    else if (streamerName === "모찌유키 MochiYuki") { spreadsheetID = process.env.YUKI_SPREADSHEET_ID; }
    else if (streamerName === "금성경") { spreadsheetID = process.env.YUKI_SPREADSHEET_ID; }

    let scheduleData = await readSheet(sheetName, startCell, endCell, spreadsheetID);

    let lastRow = scheduleData.length;
    lastRow = lastRow.toString();

    scheduleData.push([lastRow, userName, formattedDate, schedule]);

    console.log(scheduleData);
    await writeSheet(sheetName, startCell, endCell, scheduleData, spreadsheetID);

    await chat.send("스케줄이 등록되었습니다");
}

module.exports = registerSchedule;