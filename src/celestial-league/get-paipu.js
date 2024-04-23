const readSheet = require('./read-sheet.js');

async function getPaipu(data, o, chat) {
    console.log("getting paipu");
    let message = data[o].message;
    let week = message.split(" ")[1];
    let player = "";
    try { player = message.split(" ")[2]; } catch { player = ""; }

    const sheetName = "패보";
    const startCell = "U2";
    const endCell = "X800";
    let paipuData = await readSheet(sheetName, startCell, endCell);

    let result = paipuData.filter(row => row[0] === week);
    if ( !player ) { player = result[0][3]; }
    
    let personalResult = result.filter(row => row[3] === player);
    let resultString = `1국: ${personalResult[0][2]} / 2국: ${personalResult[1][2]}`

    await chat.send(resultString);
}

module.exports = getPaipu;