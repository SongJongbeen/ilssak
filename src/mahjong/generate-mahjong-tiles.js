function generateMahjongTiles() {
    const tiles = [];
  
    // 만수(萬子, m), 통수(筒子, p), 삭수(索子, s) 각각 1부터 9까지
    ['m', 'p', 's'].forEach(type => {
        for (let i = 1; i <= 9; i++) {
            for (let j = 0; j < 4; j++) {  // 각 타일을 4번씩 추가
                tiles.push(`${i}${type}`);
            }
        }
    });
  
    // 자패(字牌, z) 1부터 7까지
    for (let i = 1; i <= 7; i++) {
        for (let j = 0; j < 4; j++) {  // 각 타일을 4번씩 추가
            tiles.push(`${i}z`);
        }
    }
  
    return tiles;
}

module.exports = generateMahjongTiles;