const generateMahjongTiles = require('./generate-mahjong-tiles.js');
const sortHand = require('./sort-hand.js');

async function drawHand(chat) {
    const hand = [];
    const tiles = generateMahjongTiles();
    const tilesCopy = [...tiles]; // 타일 세트의 복사본을 만듭니다.
  
    for (let i = 0; i < 14; i++) {
        const tileIndex = Math.floor(Math.random() * tilesCopy.length); // 무작위 인덱스 선택
        hand.push(tilesCopy[tileIndex]); // 선택된 타일을 핸드에 추가
        tilesCopy.splice(tileIndex, 1); // 사용된 타일은 배열에서 제거
    }

    console.log(hand);

    let sortedHand = await sortHand(hand);
  
    chat.send(`배패: ${sortedHand}`);
    return hand;
}

module.exports = drawHand;
