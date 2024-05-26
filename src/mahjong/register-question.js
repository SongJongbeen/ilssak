const readSheet = require('./read-sheet.js');
const writeSheet = require('./write-sheet.js');

async function registerQuestion(data, o, chat, streamerName) {
    console.log("registering question")

    const message = data[o].message;
    const parsed_message = message.split(" ");

    let userName = data[o]["author"]["name"];

    const dateStr = new Date().toLocaleString("en-US", {timeZone: "Asia/Seoul"});
    const [datePart] = dateStr.split(", ");
    const [month, day, year] = datePart.split("/");

    const formattedMonth = month.padStart(2, "0");
    const formattedDay = day.padStart(2, "0");

    const formattedDate = `${year}${formattedMonth}${formattedDay}`;

    let question = parsed_message.slice(1).join(" ");
    
    const sheetName = "질문";
    const startCell = "A2";
    const endCell = "D100";
    let spreadsheetID = "";
    if (streamerName === "해모수보컬") { spreadsheetID = process.env.HMS_SPREADSHEET_ID; }
    else if (streamerName === "병겜임") { spreadsheetID = process.env.BGI_SPREADSHEET_ID; }
    else if (streamerName === "캐피탈호") { spreadsheetID = process.env.CAPITAL_SPREADSHEET_ID; }
    else if (streamerName === "유키ㅡ") { spreadsheetID = process.env.YUKI_SPREADSHEET_ID; }
    else if (streamerName === "금성경") { spreadsheetID = process.env.YUKI_SPREADSHEET_ID; }
    let questionData = await readSheet(sheetName, startCell, endCell, spreadsheetID);

    let lastRow = questionData.length;
    lastRow = lastRow.toString();

    questionData.push([lastRow, userName, formattedDate, question]);

    console.log(questionData);
    await writeSheet(sheetName, startCell, endCell, questionData, spreadsheetID);

    await chat.send("질문이 등록되었습니다");
}

module.exports = registerQuestion;