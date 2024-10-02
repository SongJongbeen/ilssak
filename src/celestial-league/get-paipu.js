const readSheet = require('./read-sheet.js');
const logger = require('./logger.js');

async function getPaipu(data, o, chat) {
    logger.info("getting paipu");
    let message = data[o].message;
    let week = message.split(" ")[1];
    let playerName = "";
    try { playerName = message.split(" ")[2]; } catch { playerName = ""; }

    if (week === "") { await chat.send("주차를 입력해주세요"); return; }

    // change playerName using ./players.json
    let players = require('./players.json');
    let player = players[playerName];
    if (player) { playerName = player; }

    const sheetName = "패보";
    const startCell = "U2";
    const endCell = "X5000";
    let paipuData = await readSheet(sheetName, startCell, endCell);

    let result = paipuData.filter(row => row[0] === week);
    if ( !player ) { player = result[0][3]; }
    
    let personalResult = result.filter(row => row[3] === player);
    let resultString = `1국: ${personalResult[0][2]} / 2국: ${personalResult[1][2]}`

    await chat.send(resultString);
}

module.exports = getPaipu;