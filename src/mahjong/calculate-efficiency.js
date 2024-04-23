const splitTiles = require("./split-tiles.js");
const sortObjectByValues = require("../util/sort-obj-by-values.js");
const sumValues = require("../util/sum-values.js");
const formatTopUkeire = require("./format-top-ukeire.js");

async function calculateEfficiency(data, o, chat) {
    const { tilesToHand, RuleSet } = await import('mahjong-tile-efficiency');
    console.log("calculating efficiency");

    message = data[o].message;
    parsed_message = message.split(" ");
    
    tile_input = parsed_message[1];
    tile_list = await splitTiles(tile_input);

    console.log(tile_list);
    if (tile_list.length <= 13) { chat.send("소패네요~"); return; }
    else if (tile_list.length > 14) { chat.send("다패네요~"); return; }

    const hand = tilesToHand(tile_list);
    
    const riichiRule = new RuleSet('Riichi');
    const shantenResult = await riichiRule.calShanten(hand);
    const ukeireResult = await riichiRule.calUkeire(hand)['normalDiscard'];
    const sumUkeire = await sortObjectByValues( await sumValues(ukeireResult) );
    const topUkeire = await formatTopUkeire(sumUkeire, 5);

    response = `(${shantenResult}샹텐) 유효매수: ${topUkeire}`;
    if (shantenResult === 0) { response = `(텐파이!) 대기매수: ${topUkeire}`; }
    chat.send(response);
}

module.exports = calculateEfficiency;