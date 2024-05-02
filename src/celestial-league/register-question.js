const readSheet = require('./read-sheet.js');
const writeSheet = require('./write-sheet.js');
const logger = require('./logger');

async function registerQuestion(data, o, chat) {
    logger.info("registering question");

    let message = data[o].message;
    let parsed_message = message.split(" ");
    
    // parsed_message에서 [0]은 !질문, [1]부터는 질문 내용
    let inputQuestion = parsed_message.slice(1).join(" ");
    let inputUserName = data[o]["author"]["name"];

    const dateStr = new Date().toLocaleString("en-US", {timeZone: "Asia/Seoul"});
    const [datePart] = dateStr.split(", ");
    const [month, day, year] = datePart.split("/");

    const formattedMonth = month.padStart(2, "0");
    const formattedDay = day.padStart(2, "0");

    const formattedDate = `${year}${formattedMonth}${formattedDay}`;

    const sheetName = "인터뷰 질문";
    const startCell = "B2";
    const endCell = "E1000";
    let questionData = await readSheet(sheetName, startCell, endCell);

    let lastRow = questionData.length;
    lastRow = lastRow.toString();

    questionData.push([lastRow, inputUserName, formattedDate, inputQuestion]);

    logger.info(questionData);
    await writeSheet(sheetName, startCell, endCell, questionData);

    await chat.send("질문이 등록되었습니다");
}

module.exports = registerQuestion;
