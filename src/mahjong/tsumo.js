const generateMahjongTiles = require('./generate-mahjong-tiles.js');

async function tsumo(chat) {
    const tileArray = generateMahjongTiles();
    const randomIndex = Math.floor(Math.random() * tileArray.length);
    console.log(tileArray[randomIndex])
    await chat.send(tileArray[randomIndex]);
    return tileArray[randomIndex];
}

module.exports = tsumo;